export interface ParsedCell {
  status?: string;
  main: string;
  sub?: string;
}

export interface StatusIcon {
  icon: string;
  class: string;
}

export const VALID_STATUSES = ['yes', 'no', 'warn', 'fast', 'slow'] as const;
export type Status = (typeof VALID_STATUSES)[number];

export function parseCell(value: string): ParsedCell {
  const parts = value.split('|');

  if (parts.length === 1) {
    return { main: parts[0] };
  }

  if (VALID_STATUSES.includes(parts[0] as Status)) {
    return { status: parts[0], main: parts[1], sub: parts[2] || undefined };
  }

  return { main: parts[0], sub: parts[1] };
}

export function getStatusIcon(status: string): StatusIcon | null {
  switch (status) {
    case 'yes':
      return { icon: '✓', class: 'text-green-400' };
    case 'no':
      return { icon: '✗', class: 'text-red-400' };
    case 'warn':
      return { icon: '⚠', class: 'text-yellow-400' };
    case 'fast':
      return { icon: '⚡', class: 'text-green-400' };
    case 'slow':
      return { icon: '🐌', class: 'text-red-400' };
    default:
      return null;
  }
}
