"""Run a backtest and print the nightly review.

    python run_backtest.py                      # synthetic data (plumbing check only)
    python run_backtest.py data/btc_1h.csv      # your own candles: ts,open,high,low,close,volume
"""

import sys

from agent.backtest import run
from agent.data import load_csv, synthetic
from agent.review import report


def main() -> None:
    if len(sys.argv) > 1:
        candles = load_csv(sys.argv[1])
        print(f"Loaded {len(candles)} candles from {sys.argv[1]}\n")
    else:
        candles = synthetic()
        print(f"No CSV given - using {len(candles)} synthetic candles. Results mean nothing about real markets.\n")

    result = run(candles)
    print(result.summary())
    print()
    print(report(result.outcomes))


if __name__ == "__main__":
    main()
