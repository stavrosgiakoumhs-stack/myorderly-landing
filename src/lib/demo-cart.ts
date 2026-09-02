import type { PrintStation } from "@/lib/demo-data";

export type CartLine = {
  lineId: string;
  productId: string;
  name: string;
  station: PrintStation;
  quantity: number;
  unitPrice: number;
  extras: string[];
  options: string[];
};

export type SubmittedOrder = {
  id: string;
  contextLabel: string;
  guestCount: number | null;
  note: string;
  lines: CartLine[];
  total: number;
  takeaway: boolean;
};

export function lineTotal(line: CartLine): number {
  return line.unitPrice * line.quantity;
}

export function cartTotal(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + lineTotal(line), 0);
}

let lineSeq = 0;
export function nextLineId(): string {
  lineSeq += 1;
  return `line-${lineSeq}`;
}

let orderSeq = 1043;
export function nextOrderId(): string {
  orderSeq += 1;
  return `DEMO-${orderSeq}`;
}

export function resetDemoIds() {
  lineSeq = 0;
  orderSeq = 1043;
}
