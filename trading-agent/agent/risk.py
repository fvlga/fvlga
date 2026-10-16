"""Hard risk layer. Pure code; nothing upstream can override it."""

from dataclasses import dataclass

from .schema import Decision, Direction, RiskState


@dataclass(frozen=True)
class RiskConfig:
    max_drawdown: float = 0.15  # kill switch trips at 15% below peak equity
    max_position: float = 0.25  # max |position| as a fraction of equity
    max_daily_loss: float = 0.03  # stop trading for the day at -3%
    min_quality: int = 2
    min_probability: float = 0.60
    kelly_fraction: float = 0.25  # quarter Kelly
    payoff_ratio: float = 1.0  # assumed avg win / avg loss


class RiskManager:
    def __init__(self, cfg: RiskConfig, start_equity: float):
        self.cfg = cfg
        self.peak = start_equity
        self.day_start_equity = start_equity
        self.day: int | None = None
        self.killed = False
        self.kill_reason = ""

    def update(self, ts: int, equity: float) -> RiskState:
        day = ts // 86400
        if day != self.day:
            self.day = day
            self.day_start_equity = equity
        self.peak = max(self.peak, equity)

        if self.drawdown(equity) >= self.cfg.max_drawdown:
            self._kill(f"max drawdown {self.cfg.max_drawdown:.0%} hit")
        if self.killed:
            return RiskState.REDUCE
        if self.daily_loss(equity) >= self.cfg.max_daily_loss:
            return RiskState.REDUCE
        if self.drawdown(equity) >= 0.75 * self.cfg.max_drawdown:
            return RiskState.NEAR_LIMIT
        return RiskState.SAFE

    def drawdown(self, equity: float) -> float:
        return max(0.0, 1 - equity / self.peak)

    def daily_loss(self, equity: float) -> float:
        return max(0.0, 1 - equity / self.day_start_equity)

    def _kill(self, reason: str) -> None:
        if not self.killed:
            self.killed = True
            self.kill_reason = reason

    def target_position(self, d: Decision) -> float:
        """Signed target position as a fraction of equity. 0 unless every gate passes."""
        if self.killed or d.risk_state != RiskState.SAFE:
            return 0.0
        if d.direction == Direction.NEUTRAL or d.toxic_flow:
            return 0.0
        if d.setup_quality < self.cfg.min_quality or d.probability < self.cfg.min_probability:
            return 0.0
        size = min(kelly(d.probability, self.cfg.payoff_ratio) * self.cfg.kelly_fraction, self.cfg.max_position)
        if size <= 0:
            return 0.0
        return size if d.direction == Direction.LONG else -size


def kelly(p: float, b: float) -> float:
    """Full-Kelly fraction for win probability p and payoff ratio b. Never negative."""
    return max(0.0, p - (1 - p) / b)
