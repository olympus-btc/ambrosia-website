export type OS = 'Windows' | 'macOS';
export type Arch = 'arm64' | 'x64';

export interface DownloadUrls {
  winX64: string | undefined;
  winArm64: string | undefined;
  macX64: string | undefined;
  macArm64: string | undefined;
}

export function detectOS(ua: string): OS | null {
  if (/Win/i.test(ua)) return 'Windows';
  if (/Mac/i.test(ua)) return 'macOS';
  return null;
}

export function isMobile(ua: string): boolean {
  return /Android|iPhone|iPad|iPod/i.test(ua);
}

export function detectArchFromUA(ua: string, platform: string): Arch | null {
  if (/arm64|aarch64/i.test(ua) || /arm64|aarch64/i.test(platform)) return 'arm64';
  return null;
}

export function detectArchFromRenderer(renderer: string): Arch | null {
  if (/Apple M|Apple GPU/i.test(renderer)) return 'arm64';
  if (/Qualcomm|Adreno|Snapdragon/i.test(renderer)) return 'arm64';
  return null;
}

export function getDownloadUrl(os: OS, arch: Arch, urls: DownloadUrls): string {
  if (os === 'Windows') {
    return (arch === 'arm64' ? urls.winArm64 : urls.winX64) ?? '#';
  }
  return (arch === 'arm64' ? urls.macArm64 : urls.macX64) ?? '#';
}
