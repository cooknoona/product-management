import path from 'node:path'

export function initAppPaths(mainDir: string): void {
  process.env.APP_ROOT = path.join(mainDir, '../..')
}

export function getAppRoot(): string {
  const root = process.env.APP_ROOT
  if (!root) throw new Error('APP_ROOT is not initialized')
  return root
}
