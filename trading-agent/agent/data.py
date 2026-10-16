"""Candle loading. CSV columns: ts,open,high,low,close,volume (ts = unix seconds, bar close)."""

import csv
import math
import random
from pathlib import Path

from .schema import Candle


def load_csv(path: str | Path) -> list[Candle]:
    with open(path, newline="") as f:
        rows = [
            Candle(int(r["ts"]), float(r["open"]), float(r["high"]), float(r["low"]), float(r["close"]), float(r["volume"]))
            for r in csv.DictReader(f)
        ]
    rows.sort(key=lambda c: c.ts)
    return rows


def synthetic(n: int = 2000, seed: int = 7, start_price: float = 30000.0, bar_seconds: int = 3600) -> list[Candle]:
    """Random-walk candles with drifting regimes. For plumbing tests only - it has no real edge to find."""
    rng = random.Random(seed)
    price, drift, vol = start_price, 0.0, 0.006
    candles = []
    for i in range(n):
        if i % 200 == 0:
            drift = rng.choice([-0.0008, 0.0, 0.0008])
            vol = rng.choice([0.004, 0.006, 0.012])
        ret = rng.gauss(drift, vol)
        o, c = price, price * math.exp(ret)
        hi = max(o, c) * (1 + abs(rng.gauss(0, vol / 2)))
        lo = min(o, c) * (1 - abs(rng.gauss(0, vol / 2)))
        candles.append(Candle((i + 1) * bar_seconds, o, hi, lo, c, abs(rng.gauss(100, 25))))
        price = c
    return candles
