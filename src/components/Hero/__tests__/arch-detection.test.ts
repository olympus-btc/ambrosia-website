import { describe, it, expect } from 'vitest';
import { detectOS, isMobile, detectArchFromUA, detectArchFromRenderer, getDownloadUrl, type DownloadUrls } from '../arch-detection';

const mockUrls: DownloadUrls = {
  winX64: 'https://example.com/win-x64.exe',
  winArm64: 'https://example.com/win-arm64.exe',
  macX64: 'https://example.com/mac-x64.dmg',
  macArm64: 'https://example.com/mac-arm64.dmg',
};

describe('detectOS', () => {
  it('detects Windows', () => {
    expect(detectOS('Mozilla/5.0 (Windows NT 10.0; Win64; x64)')).toBe('Windows');
  });

  it('detects macOS', () => {
    expect(detectOS('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)')).toBe('macOS');
  });

  it('returns null for Linux', () => {
    expect(detectOS('Mozilla/5.0 (X11; Linux x86_64)')).toBeNull();
  });

  it('returns null for unknown UA', () => {
    expect(detectOS('')).toBeNull();
  });
});

describe('isMobile', () => {
  it('detects Android', () => {
    expect(isMobile('Mozilla/5.0 (Linux; Android 13) Mobile')).toBe(true);
  });

  it('detects iPhone', () => {
    expect(isMobile('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)')).toBe(true);
  });

  it('detects iPad', () => {
    expect(isMobile('Mozilla/5.0 (iPad; CPU OS 17_0)')).toBe(true);
  });

  it('returns false for desktop Windows', () => {
    expect(isMobile('Mozilla/5.0 (Windows NT 10.0; Win64; x64)')).toBe(false);
  });

  it('returns false for desktop macOS', () => {
    expect(isMobile('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)')).toBe(false);
  });
});

describe('detectArchFromUA', () => {
  it('detects arm64 from UA string', () => {
    expect(detectArchFromUA('Mozilla/5.0 (Windows NT; arm64)', '')).toBe('arm64');
  });

  it('detects aarch64 from UA string', () => {
    expect(detectArchFromUA('Mozilla/5.0 (Linux; aarch64)', '')).toBe('arm64');
  });

  it('detects arm64 from platform string', () => {
    expect(detectArchFromUA('Mozilla/5.0', 'arm64')).toBe('arm64');
  });

  it('returns null for x64 UA', () => {
    expect(detectArchFromUA('Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'Win32')).toBeNull();
  });

  it('returns null for empty strings', () => {
    expect(detectArchFromUA('', '')).toBeNull();
  });
});

describe('detectArchFromRenderer', () => {
  it('detects Apple M chip', () => {
    expect(detectArchFromRenderer('Apple M1')).toBe('arm64');
  });

  it('detects Apple GPU', () => {
    expect(detectArchFromRenderer('Apple GPU')).toBe('arm64');
  });

  it('detects Qualcomm', () => {
    expect(detectArchFromRenderer('Qualcomm Adreno 690')).toBe('arm64');
  });

  it('detects Adreno', () => {
    expect(detectArchFromRenderer('Adreno (TM) 730')).toBe('arm64');
  });

  it('detects Snapdragon', () => {
    expect(detectArchFromRenderer('Snapdragon X Elite')).toBe('arm64');
  });

  it('returns null for Intel GPU', () => {
    expect(detectArchFromRenderer('Intel Iris Xe Graphics')).toBeNull();
  });

  it('returns null for NVIDIA', () => {
    expect(detectArchFromRenderer('NVIDIA GeForce RTX 3080')).toBeNull();
  });
});

describe('getDownloadUrl', () => {
  it('returns Windows x64 URL', () => {
    expect(getDownloadUrl('Windows', 'x64', mockUrls)).toBe('https://example.com/win-x64.exe');
  });

  it('returns Windows arm64 URL', () => {
    expect(getDownloadUrl('Windows', 'arm64', mockUrls)).toBe('https://example.com/win-arm64.exe');
  });

  it('returns macOS x64 URL', () => {
    expect(getDownloadUrl('macOS', 'x64', mockUrls)).toBe('https://example.com/mac-x64.dmg');
  });

  it('returns macOS arm64 URL', () => {
    expect(getDownloadUrl('macOS', 'arm64', mockUrls)).toBe('https://example.com/mac-arm64.dmg');
  });

  it('returns # when URL is undefined', () => {
    expect(getDownloadUrl('Windows', 'x64', { winX64: undefined, winArm64: undefined, macX64: undefined, macArm64: undefined })).toBe('#');
  });
});
