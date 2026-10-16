import math
import unittest
from dataclasses import replace

from agent.backtest import run
from agent.broker import PaperBroker
from agent.data import synthetic
from agent.policy import PolicyConfig, decide
from agent.review import Outcome, brier
from agent.risk import RiskConfig, RiskManager, kelly
from agent.schema import Candle, Decision, Direction, Regime, RiskState
from agent.state import StateEngine


def decision(**kw) -> Decision:
    base = dict(ts=0, regime=Regime.TRENDING, direction=Direction.LONG, toxic_flow=False,
                setup_quality=3, probability=0.75, risk_state=RiskState.SAFE)
    base.update(kw)
    return Decision(**base)


class StateEngineTests(unittest.TestCase):
    def test_rejects_out_of_order_candles(self):
        eng = StateEngine()
        eng.push(Candle(100, 1, 1, 1, 1, 1))
        with self.assertRaises(ValueError):
            eng.push(Candle(100, 1, 1, 1, 1, 1))

    def test_snapshot_ignores_future_bars(self):
        """Snapshot at bar t must be identical whether or not wild future bars exist."""
        candles = synthetic(200, seed=1)
        a, b = StateEngine(), StateEngine()
        for c in candles[:120]:
            a.push(c)
            b.push(c)
        snap_a = a.snapshot(0.0, 0.0)
        for c in candles[120:]:
            b.push(replace(c, close=c.close * 10))  # b sees a crazy future...
        b2 = StateEngine()
        for c in candles[:120]:
            b2.push(c)
        self.assertEqual(snap_a, b2.snapshot(0.0, 0.0))  # ...but bar-120 view is unaffected

    def test_backtest_decisions_unchanged_by_future_data(self):
        candles = synthetic(600, seed=3)
        cut = 400
        future_shocked = candles[:cut] + [replace(c, close=c.close * 3, high=c.high * 3) for c in candles[cut:]]
        d1 = [o.decision for o in run(candles).outcomes if o.decision.ts < candles[cut - 1].ts]
        d2 = [o.decision for o in run(future_shocked).outcomes if o.decision.ts < candles[cut - 1].ts]
        self.assertEqual(d1, d2)


class RiskTests(unittest.TestCase):
    def test_kelly(self):
        self.assertAlmostEqual(kelly(0.6, 1.0), 0.2)
        self.assertEqual(kelly(0.4, 1.0), 0.0)

    def test_size_is_quarter_kelly_and_capped(self):
        rm = RiskManager(RiskConfig(), 10_000)
        self.assertAlmostEqual(rm.target_position(decision(probability=0.7)), 0.25 * 0.4)
        capped = RiskManager(RiskConfig(max_position=0.1), 10_000)
        self.assertEqual(capped.target_position(decision(probability=0.99)), 0.1)
        self.assertLess(rm.target_position(decision(direction=Direction.SHORT)), 0)

    def test_gates_block_trades(self):
        rm = RiskManager(RiskConfig(), 10_000)
        self.assertEqual(rm.target_position(decision(setup_quality=1)), 0)
        self.assertEqual(rm.target_position(decision(probability=0.55)), 0)
        self.assertEqual(rm.target_position(decision(toxic_flow=True)), 0)
        self.assertEqual(rm.target_position(decision(risk_state=RiskState.NEAR_LIMIT)), 0)

    def test_kill_switch_is_permanent(self):
        rm = RiskManager(RiskConfig(max_drawdown=0.15), 10_000)
        self.assertEqual(rm.update(0, 8_400), RiskState.REDUCE)
        self.assertTrue(rm.killed)
        self.assertEqual(rm.update(86400 * 5, 20_000), RiskState.REDUCE)  # recovery doesn't un-kill
        self.assertEqual(rm.target_position(decision()), 0)

    def test_daily_loss_resets_next_day(self):
        rm = RiskManager(RiskConfig(max_daily_loss=0.03, max_drawdown=0.5), 10_000)
        rm.update(0, 10_000)
        self.assertEqual(rm.update(3600, 9_600), RiskState.REDUCE)
        self.assertNotEqual(rm.update(86400 + 10, 9_600), RiskState.REDUCE)

    def test_position_never_exceeds_cap(self):
        cfg = RiskConfig(max_position=0.1, min_probability=0.5, min_quality=1)
        rm = RiskManager(cfg, 10_000)
        broker = PaperBroker(cash=10_000)
        for p in (0.51, 0.7, 0.99, 0.99):
            for direction in (Direction.LONG, Direction.SHORT):
                broker.rebalance(0, 100.0, rm.target_position(decision(probability=p, direction=direction)))
                self.assertLessEqual(abs(broker.position_fraction(100.0)), cfg.max_position + 0.002)


class PolicyTests(unittest.TestCase):
    def test_crisis_is_neutral(self):
        from agent.schema import Snapshot
        s = Snapshot(ts=1, price=1, ret_short=0.05, ret_long=0.2, realized_vol=0.05, range_pct=0.01,
                     volume_z=0, drawdown=0, position=0)
        d = decide(s, PolicyConfig(), RiskState.SAFE)
        self.assertEqual(d.regime, Regime.CRISIS)
        self.assertEqual(d.direction, Direction.NEUTRAL)


class ReviewTests(unittest.TestCase):
    def test_brier(self):
        outs = [Outcome(decision(probability=0.8), True), Outcome(decision(probability=0.8), False)]
        self.assertAlmostEqual(brier(outs), (0.04 + 0.64) / 2)
        self.assertTrue(math.isnan(brier([])))


if __name__ == "__main__":
    unittest.main()
