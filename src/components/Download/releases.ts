export interface ReleaseAsset {
  name: string;
  browser_download_url: string;
}

export interface GithubRelease {
  tag_name: string;
  assets: ReleaseAsset[];
}

export interface DownloadUrls {
  winX64: string;
  winArm64: string;
  macX64: string;
  macArm64: string;
}

const FALLBACK_VERSION = 'v0.6.0-beta';
const GITHUB_API_URL = 'https://api.github.com/repos/olympus-btc/ambrosia/releases/latest';

export function findAssetByPattern(assets: ReleaseAsset[], pattern: RegExp): string {
  return assets.find((a) => pattern.test(a.name))?.browser_download_url ?? '#';
}

export function stripVersionPrefix(version: string): string {
  return version.replace(/^v/, '');
}

export function buildVerifyCommand(platform: 'linux' | 'windows' | 'macos', version: string): string {
  const v = stripVersionPrefix(version);
  if (platform === 'linux') return `sha256sum ambrosia-pos_${v}_amd64.deb`;
  if (platform === 'windows') return `Get-FileHash ambrosia-pos-${v}-x64-setup.exe -Algorithm SHA256`;
  return `shasum -a 256 ambrosia-pos-${v}-arm64.dmg`;
}

export function parseDownloadUrls(assets: ReleaseAsset[]): DownloadUrls {
  return {
    winX64: findAssetByPattern(assets, /ambrosia-pos.*-x64-setup\.exe$/),
    winArm64: findAssetByPattern(assets, /ambrosia-pos.*-arm64-setup\.exe$/),
    macX64: findAssetByPattern(assets, /ambrosia-pos.*-x64\.dmg$/),
    macArm64: findAssetByPattern(assets, /ambrosia-pos.*-arm64\.dmg$/),
  };
}

export async function fetchLatestRelease(): Promise<{ version: string; assets: ReleaseAsset[] }> {
  try {
    const res = await fetch(GITHUB_API_URL, {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (res.ok) {
      const release: GithubRelease = await res.json();
      return {
        version: release.tag_name ?? FALLBACK_VERSION,
        assets: release.assets ?? [],
      };
    }
  } catch {}

  return { version: FALLBACK_VERSION, assets: [] };
}
