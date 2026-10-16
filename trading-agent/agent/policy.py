"""Rule-based policy: Snapshot -> Decision. Plain, auditable rules in code instead of a black-box model.

Every threshold lives in PolicyConfig so the nightly review can propose changes,
and a human approves them before they ship.
"""

import math
from dataclasses import dataclass

from .schema import Decision, Direction, Regime, RiskState, Snapshot


@dataclass(frozen=True)
class PolicyConfig:
    crisis_vol: float = 0.03  # 1-bar log-return stdev above which we call it crisis
    high_vol: float = 0.015
    trend_threshold: float = 0.02  # |ret_long| above this = trending
    toxic_range: float = 0.04  # a single bar this wide = toxic flow
    toxic_volume_z: float = 4.0
    # Logistic calibration: P = sigmoid(a * |signal| / vol + b). Fit these on history, not by hand.
    calib_a: float = 0.35
    calib_b: float = 0.0


def classify_regime(s: Snapshot, cfg: PolicyConfig) -> Regime:
    if s.realized_vol >= cfg.crisis_vol:
        return Regime.CRISIS
    if s.realized_vol >= cfg.high_vol:
        return Regime.HIGH_VOL
    if abs(s.ret_long) >= cfg.trend_threshold:
        return Regime.TRENDING
    return Regime.MEAN_REVERTING


def decide(s: Snapshot, cfg: PolicyConfig, risk_state: RiskState) -> Decision:
    regime = classify_regime(s, cfg)
    toxic = s.range_pct >= cfg.toxic_range or abs(s.volume_z) >= cfg.toxic_volume_z

    if regime == Regime.TRENDING:
        signal = s.ret_long  # follow the trend
    elif regime == Regime.MEAN_REVERTING:
        signal = -s.ret_short  # fade short moves
    else:
        signal = 0.0  # no edge claimed in high-vol or crisis

    if signal > 0:
        direction = Direction.LONG
    elif signal < 0:
        direction = Direction.SHORT
    else:
        direction = Direction.NEUTRAL

    vol = max(s.realized_vol, 1e-6)
    strength = abs(signal) / (vol * math.sqrt(24))  # signal in units of daily-ish vol
    probability = 0.5 if direction == Direction.NEUTRAL else 1 / (1 + math.exp(-(cfg.calib_a * strength + cfg.calib_b)))

    quality = 0
    if direction != Direction.NEUTRAL:
        quality = 1
        if strength >= 1.0:
            quality += 1
        if not toxic and regime in (Regime.TRENDING, Regime.MEAN_REVERTING):
            quality += 1

    return Decision(
        ts=s.ts,
        regime=regime,
        direction=direction,
        toxic_flow=toxic,
        setup_quality=quality,
        probability=probability,
        risk_state=risk_state,
    )
