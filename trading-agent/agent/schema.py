"""Typed decision schema. Every candle produces exactly one Decision."""

from dataclasses import dataclass
from enum import Enum


class Direction(str, Enum):
    LONG = "long"
    SHORT = "short"
    NEUTRAL = "neutral"


class Regime(str, Enum):
    TRENDING = "trending"
    MEAN_REVERTING = "mean_reverting"
    HIGH_VOL = "high_vol"
    CRISIS = "crisis"


class RiskState(str, Enum):
    SAFE = "safe"
    NEAR_LIMIT = "near_limit"
    REDUCE = "reduce"


@dataclass(frozen=True)
class Candle:
    ts: int  # unix seconds, candle close time
    open: float
    high: float
    low: float
    close: float
    volume: float


@dataclass(frozen=True)
class Snapshot:
    """Compact numeric view of the market at one timestamp. Built only from data at or before ts."""

    ts: int
    price: float
    ret_short: float  # return over the short lookback
    ret_long: float  # return over the long lookback
    realized_vol: float  # stdev of 1-bar returns over the vol window
    range_pct: float  # (high - low) / close of the latest bar
    volume_z: float  # z-score of the latest volume vs the vol window
    drawdown: float  # equity drawdown from peak, 0..1
    position: float  # current position as a fraction of equity, signed


@dataclass(frozen=True)
class Decision:
    ts: int
    regime: Regime
    direction: Direction
    toxic_flow: bool
    setup_quality: int  # 0..3
    probability: float  # calibrated P(next move is in `direction`), 0..1
    risk_state: RiskState

    def __post_init__(self):
        if not 0 <= self.setup_quality <= 3:
            raise ValueError("setup_quality must be 0..3")
        if not 0.0 <= self.probability <= 1.0:
            raise ValueError("probability must be 0..1")
