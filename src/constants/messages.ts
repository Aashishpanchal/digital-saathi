export function emptyText(label: string): string {
  return `${label} is not allowed to be empty`;
}

export function minText(label: string): string {
  return `${label} must be at least 2 characters`;
}
