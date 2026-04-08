import { ipcMain } from 'electron'

/** 홈 대시보드용 IPC — 이후 집계·요약 API를 여기에 연결 */
export function registerHomeHandlers(): void {
  ipcMain.handle('home:ping', async () => ({ ok: true as const }))
}
