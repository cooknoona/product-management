import { BrowserWindow, shell } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getAppRoot } from '../app/env'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const preload = path.join(__dirname, '../preload/index.mjs')

export function createMainWindow(): BrowserWindow {
  const rendererDist = path.join(getAppRoot(), 'dist')
  const indexHtml = path.join(rendererDist, 'index.html')
  const viteUrl = process.env.VITE_DEV_SERVER_URL

  const win = new BrowserWindow({
    title: '재고조사',
    width: 1200,
    height: 800,
    webPreferences: {
      preload,
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  if (viteUrl) {
    win.loadURL(viteUrl)
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })

  return win
}
