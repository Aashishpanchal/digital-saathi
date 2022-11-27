export function emptyText(label: string): string {
  return `${label} is not allowed to be empty`;
}

export function minText(label: string): string {
  return `${label} must be at least 2 characters`;
}

export function getStrOrderStatus(status: number | number[]) {
  const value: Record<string | number, string> = {
    0: "New",
    1: "Accepted",
    2: "In Process",
    3: "In Process",
    4: "Out For Delivery",
    5: "Delivered",
    6: "Return from farmer",
    7: "Cancelled",
    8: "Return in process",
    9: "Rejected",
    10: "Rejected",
    11: "Cancel return",
    12: "Return in process",
    13: "Cancel return",
    14: "Return in process",
    15: "Cancel return",
    16: "Return in process",
    17: "Returned",
    18: "Refunded",
    "11,13,15": "Cancel return",
    "2,3": "In Process",
    "9,10": "Rejected",
  };
  const key = status instanceof Array ? status.join(",") : status;
  return value[key];
}
