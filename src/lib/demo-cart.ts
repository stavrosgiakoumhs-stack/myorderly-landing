import type { PrintStation } from "@/lib/demo-data";

export type CartExtra = {
  id: string;
  name: string;
  price: number;
};

export type CartOption = {
  id: string;
  groupId: string;
  groupName: string;
  name: string;
  priceDelta: number;
};

export type CartLine = {
  lineId: string;
  productId: string;
  categoryId: string;
  name: string;
  station: PrintStation;
  quantity: number;
  basePrice: number;
  extras: CartExtra[];
  options: CartOption[];
  note: string;
};

export function lineTotal(line: CartLine): number {
  const extras = line.extras.reduce((sum, extra) => sum + Number(extra.price), 0);
  const options = line.options.reduce((sum, option) => sum + Number(option.priceDelta), 0);
  return (Number(line.basePrice) + extras + options) * line.quantity;
}

export function cartTotal(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + lineTotal(line), 0);
}

export function cartQuantity(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

export function lineKey(
  productId: string,
  note: string,
  extras: CartExtra[],
  options: CartOption[],
): string {
  const extraIds = extras.map((extra) => extra.id).sort().join(".");
  const optionIds = options.map((option) => option.id).sort().join(".");
  return `${productId}:${extraIds}:${optionIds}:${note.trim().toLocaleLowerCase("el-GR")}`;
}

let lineSeq = 0;
export function nextLineId(): string {
  lineSeq += 1;
  return `line-${lineSeq}`;
}

let orderSeq = 1043;
export function nextOrderNumber(): number {
  orderSeq += 1;
  return orderSeq;
}

export function nextOrderId(): string {
  return `DEMO-${nextOrderNumber()}`;
}

export function resetDemoIds() {
  lineSeq = 0;
  orderSeq = 1043;
}
