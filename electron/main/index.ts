import { app, BrowserWindow, Menu } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import os from 'node:os'
import { initAppPaths } from './app/env'
import { closeDatabase, initDatabase } from './database/connection'
import { registerAllIpcHandlers } from './ipc/register-handlers'
import { runAdminInitialiser } from './login/AdminInitialiser'
import { createMainWindow } from './window/main-window'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

initAppPaths(__dirname)

export const RENDERER_DIST = path.join(process.env.APP_ROOT!, 'dist')
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT!, 'public')
  : RENDERER_DIST

if (os.release().startsWith('6.1')) app.disableHardwareAcceleration()
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let win: BrowserWindow | null = null

app.whenReady().then(() => {
  Menu.setApplicationMenu(null)
  initDatabase()
  runAdminInitialiser()
  registerAllIpcHandlers()
  win = createMainWindow()
})

app.on('before-quit', () => {
  closeDatabase()
})

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) allWindows[0].focus()
  else win = createMainWindow()
})
