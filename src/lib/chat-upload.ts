/** 1GB. Shared by the browser and the upload route so both sides use the same cap. */
export const CHAT_FILE_MAX = 1024 * 1024 * 1024;

/** Each request stays small enough for the dev server. A 1GB file is many of these. */
export const CHAT_FILE_CHUNK = 512 * 1024;

export function formatBytes(size: number): string {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.ceil(size / 1024)} KB`;
  if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(size < 10 * 1024 * 1024 ? 1 : 0)} MB`;
  return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
