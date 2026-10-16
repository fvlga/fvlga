"""Nightly review: score calibration and report. It proposes changes; a human approves them."""

from dataclasses import dataclass

from .schema import Decision, Direction


@dataclass(frozen=True)
class Outcome:
    decision: Decision
    hit: bool  # did price move in decision.direction over the next bar?


def brier(outcomes: list[Outcome]) -> float:
    scored = [o for o in outcomes if o.decision.direction != Direction.NEUTRAL]
    if not scored:
        return float("nan")
    return sum((o.decision.probability - (1.0 if o.hit else 0.0)) ** 2 for o in scored) / len(scored)


def calibration_table(outcomes: list[Outcome], bins: int = 5) -> list[tuple[str, int, float, float]]:
    """Rows of (bucket, count, mean predicted, actual hit rate) for directional calls."""
    rows = []
    scored = [o for o in outcomes if o.decision.direction != Direction.NEUTRAL]
    for i in range(bins):
        lo, hi = 0.5 + 0.5 * i / bins, 0.5 + 0.5 * (i + 1) / bins
        bucket = [o for o in scored if lo <= o.decision.probability < hi or (i == bins - 1 and o.decision.probability == 1.0)]
        if bucket:
            pred = sum(o.decision.probability for o in bucket) / len(bucket)
            actual = sum(o.hit for o in bucket) / len(bucket)
            rows.append((f"{lo:.2f}-{hi:.2f}", len(bucket), pred, actual))
    return rows


def report(outcomes: list[Outcome]) -> str:
    lines = [f"Brier score (directional calls): {brier(outcomes):.4f}  (0.25 = coin flip, lower is better)", ""]
    lines.append(f"{'bucket':<12}{'n':>6}{'predicted':>12}{'actual':>10}")
    flags = []
    for bucket, n, pred, actual in calibration_table(outcomes):
        lines.append(f"{bucket:<12}{n:>6}{pred:>12.3f}{actual:>10.3f}")
        if n >= 30 and abs(pred - actual) > 0.05:
            flags.append(f"- {bucket}: predicted {pred:.2f} but hit {actual:.2f}; refit calib_a/calib_b.")
    lines.append("")
    lines.append("Proposed changes (need human approval):")
    lines.extend(flags or ["- none; calibration within tolerance or sample too small."])
    return "\n".join(lines)
