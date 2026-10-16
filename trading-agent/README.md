# Trading Agent (paper only)

This is a crypto trading agent built from the "24/7 autonomous trading agent" prompt, minus the parts that would lose you money or rely on unverified products. It is a **paper-trading and backtesting** system and **never places real orders.**

It uses Python 3.11 and the standard library only, with no dependencies.

```bash
python run_backtest.py                   # synthetic data: checks the plumbing only
python run_backtest.py data/btc_1h.csv   # your own candles: ts,open,high,low,close,volume
python -m unittest discover -s tests -t .
```

## How it maps to the prompt

| Prompt section | Here | Notes |
|---|---|---|
| `jev_schema` | `agent/schema.py` | Typed `Decision`: regime, direction, toxic_flow, setup_quality 0–3, probability, risk_state |
| `state_engine` | `agent/state.py` | Candles become one numeric `Snapshot`. Out-of-order bars are rejected, so no field can see the future. |
| "The REFLEX" (Jev) | `agent/policy.py` | **Plain rules in code** instead of a paid model, which makes every decision easy to audit. |
| `risk_layer` | `agent/risk.py` | Hard limits: 15% max drawdown, a permanent kill switch, max position, max daily loss, and quarter Kelly |
| Execution | `agent/broker.py` | **Paper broker only**, with fees (0.10%) and slippage (0.05%) on every fill |
| `self_improvement` | `agent/review.py` | Nightly Brier score and calibration table. It **proposes** changes, and a human approves them. |
| Loop / backtest | `agent/backtest.py` | Causal event loop. Each decision is scored on the *next* bar. |

## What I left out, and why

- **AgenKit (agenkit.xyz) and Jev (key from typesafe.ai).** I couldn't verify these products, and the prompt reads like an ad for them: it tells you to "Get AgenKit" five times. Never give an unknown tool an exchange API key. Deterministic rules do the same job and you can read every line of them.
- **Live trading.** There is no live broker on purpose. Real money comes last, after the steps below.
- **Self-rewriting overnight.** If a bot rewrites its own rules and ships them without a person checking, it can overfit last night's noise and trade it the next morning. The review here only flags problems, and you decide what changes.
- **"Find 5–10 asymmetric altcoin setups."** That is research for a person to do, and a model making up "catalysts" is a known way to lose money. This agent trades the instruments you give it data for.

## What the sample run shows

On synthetic random-walk data the review says roughly this:

```
Brier score: 0.254  (0.25 = coin flip)
0.60-0.70: predicted 0.64 but hit 0.54; refit calib_a/calib_b.
```

**That is the system working correctly.** The data has no edge, and the review catches that the model's confidence is higher than its results. Expect the same kind of report on real data until a rule shows it has an edge.

## Path to real money (don't skip steps)

1. **Backtest on real data.** Use at least 2 years of hourly BTC/ETH candles, exported from your exchange as CSV.
2. **Test on data you didn't tune on.** Tune thresholds on the first 70% of the data, then run once on the last 30%. If the edge disappears, there wasn't one.
3. **Beat the costs.** Re-run with double the fees and slippage. If you only profit at the cheapest assumptions, the strategy won't survive real trading.
4. **Paper trade live for at least 4 weeks.** Feed real candles into the same loop and log every decision.
5. **Then trade tiny amounts.** Use money you can afford to lose entirely, with withdrawal permissions **disabled** on the API key.

## WHAT COULD I BE WRONG ABOUT?

- **Most retail trading bots lose money** once fees and slippage are counted. The default rules here have no proven edge.
- **Backtests flatter strategies.** Every parameter you tune is another chance to overfit.
- **Crypto has gaps, outages and exchange failures** that candles don't capture. A stop-loss is no use if the exchange goes down.
- **Calibration drifts.** A probability that was well calibrated last month may not be next month, which is why the nightly review exists.
- **A strategy that survives beats one that only looks profitable.** If the risk layer and the strategy disagree, the risk layer wins.
