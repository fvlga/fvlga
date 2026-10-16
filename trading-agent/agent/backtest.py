"""Event loop shared by backtests and (later) the paper-trading loop.

Order of operations per bar, which is what keeps it causal:
  1. push the bar that just closed
  2. mark equity at that close and update risk
  3. decide and rebalance at that close (plus slippage)
  4. the *next* bar's close scores the decision
"""

from dataclasses import dataclass

from .broker import PaperBroker
from .policy import PolicyConfig, decide
from .review import Outcome
from .risk import RiskConfig, RiskManager
from .schema import Candle, Decision, Direction
from .state import StateEngine


@dataclass
class Result:
    start_equity: float
    end_equity: float
    max_drawdown: float
    trades: int
    fees: float
    killed: bool
    kill_reason: str
    outcomes: list[Outcome]
    buy_and_hold: float

    def summary(self) -> str:
        ret = self.end_equity / self.start_equity - 1
        return "\n".join([
            f"Return:         {ret:+.2%}  (buy & hold {self.buy_and_hold:+.2%})",
            f"Max drawdown:   {self.max_drawdown:.2%}",
            f"Trades:         {self.trades}   fees paid: {self.fees:,.2f}",
            f"Kill switch:    {'TRIPPED - ' + self.kill_reason if self.killed else 'not tripped'}",
        ])


def run(candles: list[Candle], start_equity: float = 10_000.0, policy: PolicyConfig | None = None,
        risk: RiskConfig | None = None, fee_rate: float = 0.001, slippage: float = 0.0005) -> Result:
    policy = policy or PolicyConfig()
    engine = StateEngine()
    broker = PaperBroker(cash=start_equity, fee_rate=fee_rate, slippage=slippage)
    rm = RiskManager(risk or RiskConfig(), start_equity)
    pending: Decision | None = None
    pending_price = 0.0
    outcomes: list[Outcome] = []
    max_dd = 0.0

    for candle in candles:
        engine.push(candle)
        price = candle.close

        if pending is not None and pending.direction != Direction.NEUTRAL:
            up = price > pending_price
            outcomes.append(Outcome(pending, up if pending.direction == Direction.LONG else not up))
        pending = None

        equity = broker.equity(price)
        risk_state = rm.update(candle.ts, equity)
        max_dd = max(max_dd, rm.drawdown(equity))

        snap = engine.snapshot(drawdown=rm.drawdown(equity), position=broker.position_fraction(price))
        if snap is None:
            continue
        decision = decide(snap, policy, risk_state)
        broker.rebalance(candle.ts, price, rm.target_position(decision))
        pending, pending_price = decision, price

    final = candles[-1].close
    return Result(
        start_equity=start_equity,
        end_equity=broker.equity(final),
        max_drawdown=max_dd,
        trades=len(broker.fills),
        fees=sum(f.fee for f in broker.fills),
        killed=rm.killed,
        kill_reason=rm.kill_reason,
        outcomes=outcomes,
        buy_and_hold=final / candles[0].close - 1,
    )
