"""Paper broker with fees and slippage. There is deliberately no live broker in this project."""

from dataclasses import dataclass, field


@dataclass
class Fill:
    ts: int
    price: float
    qty: float  # signed units
    fee: float


@dataclass
class PaperBroker:
    cash: float
    fee_rate: float = 0.001  # 0.10% taker fee
    slippage: float = 0.0005  # 0.05% adverse price move per fill
    units: float = 0.0
    fills: list[Fill] = field(default_factory=list)

    def equity(self, price: float) -> float:
        return self.cash + self.units * price

    def position_fraction(self, price: float) -> float:
        eq = self.equity(price)
        return self.units * price / eq if eq > 0 else 0.0

    def rebalance(self, ts: int, price: float, target_fraction: float, min_change: float = 0.01) -> Fill | None:
        current = self.position_fraction(price)
        if abs(target_fraction - current) < min_change:
            return None
        eq = self.equity(price)
        qty = (target_fraction * eq - self.units * price) / price
        fill_price = price * (1 + self.slippage) if qty > 0 else price * (1 - self.slippage)
        fee = abs(qty) * fill_price * self.fee_rate
        self.cash -= qty * fill_price + fee
        self.units += qty
        fill = Fill(ts, fill_price, qty, fee)
        self.fills.append(fill)
        return fill
