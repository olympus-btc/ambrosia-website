import { describe, it, expect } from 'vitest';
import { findAssetByPattern, stripVersionPrefix, buildVerifyCommand, parseDownloadUrls, type ReleaseAsset } from '../releases';

const mockAssets: ReleaseAsset[] = [
  { name: 'ambrosia-pos_0.6.0_amd64.deb', browser_download_url: 'https://example.com/linux-x64.deb' },
  { name: 'ambrosia-pos_0.6.0_arm64.deb', browser_download_url: 'https://example.com/linux-arm64.deb' },
  { name: 'ambrosia-pos-0.6.0-x86_64.rpm', browser_download_url: 'https://example.com/linux-x64.rpm' },
  { name: 'ambrosia-pos-0.6.0-aarch64.rpm', browser_download_url: 'https://example.com/linux-arm64.rpm' },
  { name: 'ambrosia-pos-0.6.0-x64.tar.gz', browser_download_url: 'https://example.com/linux-x64.tar.gz' },
  { name: 'ambrosia-pos-0.6.0-arm64.tar.gz', browser_download_url: 'https://example.com/linux-arm64.tar.gz' },
  { name: 'ambrosia-pos-0.6.0-x64-setup.exe', browser_download_url: 'https://example.com/win-x64.exe' },
  { name: 'ambrosia-pos-0.6.0-arm64-setup.exe', browser_download_url: 'https://example.com/win-arm64.exe' },
  { name: 'ambrosia-pos-0.6.0-x64.zip', browser_download_url: 'https://example.com/win-x64.zip' },
  { name: 'ambrosia-pos-0.6.0-arm64.zip', browser_download_url: 'https://example.com/win-arm64.zip' },
  { name: 'ambrosia-pos-0.6.0-x64.dmg', browser_download_url: 'https://example.com/mac-x64.dmg' },
  { name: 'ambrosia-pos-0.6.0-arm64.dmg', browser_download_url: 'https://example.com/mac-arm64.dmg' },
];

describe('findAssetByPattern', () => {
  it('finds Linux x64 .deb', () => {
    expect(findAssetByPattern(mockAssets, /ambrosia-pos[_-].*[_-]amd64\.deb$/)).toBe('https://example.com/linux-x64.deb');
  });

  it('finds Linux arm64 .deb', () => {
    expect(findAssetByPattern(mockAssets, /ambrosia-pos[_-].*[_-]arm64\.deb$/)).toBe('https://example.com/linux-arm64.deb');
  });

  it('finds Linux x64 .rpm', () => {
    expect(findAssetByPattern(mockAssets, /ambrosia-pos.*x86_64\.rpm$/)).toBe('https://example.com/linux-x64.rpm');
  });

  it('finds Linux arm64 .rpm', () => {
    expect(findAssetByPattern(mockAssets, /ambrosia-pos.*aarch64\.rpm$/)).toBe('https://example.com/linux-arm64.rpm');
  });

  it('finds Linux x64 .tar.gz', () => {
    expect(findAssetByPattern(mockAssets, /ambrosia-pos.*-x64\.tar\.gz$/)).toBe('https://example.com/linux-x64.tar.gz');
  });

  it('finds Windows x64 installer', () => {
    expect(findAssetByPattern(mockAssets, /ambrosia-pos.*-x64-setup\.exe$/)).toBe('https://example.com/win-x64.exe');
  });

  it('finds Windows arm64 installer', () => {
    expect(findAssetByPattern(mockAssets, /ambrosia-pos.*-arm64-setup\.exe$/)).toBe('https://example.com/win-arm64.exe');
  });

  it('finds Windows x64 portable', () => {
    expect(findAssetByPattern(mockAssets, /ambrosia-pos.*-x64\.zip$/)).toBe('https://example.com/win-x64.zip');
  });

  it('finds macOS x64 dmg', () => {
    expect(findAssetByPattern(mockAssets, /ambrosia-pos.*-x64\.dmg$/)).toBe('https://example.com/mac-x64.dmg');
  });

  it('finds macOS arm64 dmg', () => {
    expect(findAssetByPattern(mockAssets, /ambrosia-pos.*-arm64\.dmg$/)).toBe('https://example.com/mac-arm64.dmg');
  });

  it('returns # when no asset matches', () => {
    expect(findAssetByPattern(mockAssets, /nonexistent\.pkg$/)).toBe('#');
  });

  it('returns # when assets array is empty', () => {
    expect(findAssetByPattern([], /ambrosia-pos.*-x64\.dmg$/)).toBe('#');
  });
});

describe('stripVersionPrefix', () => {
  it('strips leading v', () => {
    expect(stripVersionPrefix('v0.6.0-beta')).toBe('0.6.0-beta');
  });

  it('strips leading v from stable version', () => {
    expect(stripVersionPrefix('v1.0.0')).toBe('1.0.0');
  });

  it('returns version unchanged when no leading v', () => {
    expect(stripVersionPrefix('0.6.0-beta')).toBe('0.6.0-beta');
  });

  it('only strips one leading v', () => {
    expect(stripVersionPrefix('vv0.6.0')).toBe('v0.6.0');
  });
});

describe('buildVerifyCommand', () => {
  it('builds linux sha256sum command', () => {
    expect(buildVerifyCommand('linux', 'v0.6.0-beta')).toBe('sha256sum ambrosia-pos_0.6.0-beta_amd64.deb');
  });

  it('builds windows Get-FileHash command', () => {
    expect(buildVerifyCommand('windows', 'v0.6.0-beta')).toBe('Get-FileHash ambrosia-pos-0.6.0-beta-x64-setup.exe -Algorithm SHA256');
  });

  it('builds macos shasum command', () => {
    expect(buildVerifyCommand('macos', 'v0.6.0-beta')).toBe('shasum -a 256 ambrosia-pos-0.6.0-beta-arm64.dmg');
  });

  it('strips v prefix from version in commands', () => {
    const cmd = buildVerifyCommand('linux', 'v1.0.0');
    expect(cmd).toBe('sha256sum ambrosia-pos_1.0.0_amd64.deb');
  });
});

describe('parseDownloadUrls', () => {
  it('extracts all four platform URLs', () => {
    const urls = parseDownloadUrls(mockAssets);
    expect(urls.winX64).toBe('https://example.com/win-x64.exe');
    expect(urls.winArm64).toBe('https://example.com/win-arm64.exe');
    expect(urls.macX64).toBe('https://example.com/mac-x64.dmg');
    expect(urls.macArm64).toBe('https://example.com/mac-arm64.dmg');
  });

  it('returns # for all URLs when assets is empty', () => {
    const urls = parseDownloadUrls([]);
    expect(urls.winX64).toBe('#');
    expect(urls.winArm64).toBe('#');
    expect(urls.macX64).toBe('#');
    expect(urls.macArm64).toBe('#');
  });
});
