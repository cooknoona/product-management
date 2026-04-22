import { BrowserWindow, shell } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getAppRoot } from "../app/env";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const preload = path.join(__dirname, "../preload/index.mjs");

/** 13"급 16:9 (FHD) — 이 크기 이하로는 줄일 수 없음 */
const MIN_WIDTH = 1600;
const MIN_HEIGHT = 900;

export function createMainWindow(): BrowserWindow {
  const rendererDist = path.join(getAppRoot(), "dist");
  const indexHtml = path.join(rendererDist, "index.html");
  const viteUrl = process.env.VITE_DEV_SERVER_URL;

  const win = new BrowserWindow({
    title: "Product Management",
    width: MIN_WIDTH,
    height: MIN_HEIGHT,
    minWidth: MIN_WIDTH,
    minHeight: MIN_HEIGHT,
    webPreferences: {
      preload,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (viteUrl) {
    win.loadURL(viteUrl);
    win.webContents.openDevTools();
  } else {
    win.loadFile(indexHtml);
  }

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });

  return win;
}
