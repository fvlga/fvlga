"""Deterministic state engine: candles in, one Snapshot out. No field may see the future."""

import math
from collections import deque
from statistics import mean, pstdev

from .schema import Candle, Snapshot


class StateEngine:
    def __init__(self, short: int = 6, long: int = 24, vol_window: int = 48):
        self.short = short
        self.long = long
        self.vol_window = vol_window
        self._candles: deque[Candle] = deque(maxlen=max(long, vol_window) + 1)
        self._last_ts: int | None = None

    @property
    def warm(self) -> bool:
        return len(self._candles) > max(self.long, self.vol_window)

    def push(self, candle: Candle) -> None:
        if self._last_ts is not None and candle.ts <= self._last_ts:
            raise ValueError(f"non-causal candle: ts {candle.ts} <= last {self._last_ts}")
        self._last_ts = candle.ts
        self._candles.append(candle)

    def snapshot(self, drawdown: float, position: float) -> Snapshot | None:
        if not self.warm:
            return None
        c = list(self._candles)
        closes = [x.close for x in c]
        rets = [math.log(closes[i] / closes[i - 1]) for i in range(len(closes) - self.vol_window, len(closes))]
        vols = [x.volume for x in c[-self.vol_window:]]
        vol_sd = pstdev(vols)
        last = c[-1]
        return Snapshot(
            ts=last.ts,
            price=last.close,
            ret_short=closes[-1] / closes[-1 - self.short] - 1,
            ret_long=closes[-1] / closes[-1 - self.long] - 1,
            realized_vol=pstdev(rets),
            range_pct=(last.high - last.low) / last.close,
            volume_z=(last.volume - mean(vols)) / vol_sd if vol_sd > 0 else 0.0,
            drawdown=drawdown,
            position=position,
        )
