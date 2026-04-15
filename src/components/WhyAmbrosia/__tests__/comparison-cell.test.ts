import { describe, it, expect } from 'vitest';
import { parseCell, getStatusIcon, VALID_STATUSES } from '../comparison-cell';

describe('parseCell', () => {
  describe('single value (no pipe)', () => {
    it('returns main only', () => {
      expect(parseCell('Free forever')).toEqual({ main: 'Free forever' });
    });

    it('handles empty string', () => {
      expect(parseCell('')).toEqual({ main: '' });
    });
  });

  describe('status|main format', () => {
    it('parses yes status', () => {
      expect(parseCell('yes|Self-custodial')).toEqual({ status: 'yes', main: 'Self-custodial', sub: undefined });
    });

    it('parses no status', () => {
      expect(parseCell('no|Custodial')).toEqual({ status: 'no', main: 'Custodial', sub: undefined });
    });

    it('parses warn status', () => {
      expect(parseCell('warn|Partial')).toEqual({ status: 'warn', main: 'Partial', sub: undefined });
    });

    it('parses fast status', () => {
      expect(parseCell('fast|Instant')).toEqual({ status: 'fast', main: 'Instant', sub: undefined });
    });

    it('parses slow status', () => {
      expect(parseCell('slow|On-chain only')).toEqual({ status: 'slow', main: 'On-chain only', sub: undefined });
    });
  });

  describe('status|main|subtitle format', () => {
    it('parses all three parts', () => {
      expect(parseCell('warn|Their node|Centralized')).toEqual({
        status: 'warn',
        main: 'Their node',
        sub: 'Centralized',
      });
    });

    it('parses yes with subtitle', () => {
      expect(parseCell('yes|Your keys|Always')).toEqual({
        status: 'yes',
        main: 'Your keys',
        sub: 'Always',
      });
    });
  });

  describe('main|subtitle format (no status)', () => {
    it('treats unknown first part as main', () => {
      expect(parseCell('Fees + subscriptions|Monthly')).toEqual({
        main: 'Fees + subscriptions',
        sub: 'Monthly',
      });
    });

    it('does not treat unknown word as status', () => {
      const result = parseCell('maybe|something');
      expect(result.status).toBeUndefined();
      expect(result.main).toBe('maybe');
      expect(result.sub).toBe('something');
    });
  });

  describe('VALID_STATUSES', () => {
    it('contains all expected statuses', () => {
      expect(VALID_STATUSES).toContain('yes');
      expect(VALID_STATUSES).toContain('no');
      expect(VALID_STATUSES).toContain('warn');
      expect(VALID_STATUSES).toContain('fast');
      expect(VALID_STATUSES).toContain('slow');
    });
  });
});

describe('getStatusIcon', () => {
  it('returns green checkmark for yes', () => {
    expect(getStatusIcon('yes')).toEqual({ icon: '✓', class: 'text-green-400' });
  });

  it('returns red cross for no', () => {
    expect(getStatusIcon('no')).toEqual({ icon: '✗', class: 'text-red-400' });
  });

  it('returns yellow warning for warn', () => {
    expect(getStatusIcon('warn')).toEqual({ icon: '⚠', class: 'text-yellow-400' });
  });

  it('returns green lightning for fast', () => {
    expect(getStatusIcon('fast')).toEqual({ icon: '⚡', class: 'text-green-400' });
  });

  it('returns red snail for slow', () => {
    expect(getStatusIcon('slow')).toEqual({ icon: '🐌', class: 'text-red-400' });
  });

  it('returns null for unknown status', () => {
    expect(getStatusIcon('unknown')).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(getStatusIcon('')).toBeNull();
  });
});
