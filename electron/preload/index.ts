import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('ipcRenderer', {
  on(
    channel: string,
    listener: (event: Electron.IpcRendererEvent, ...args: unknown[]) => void,
  ) {
    return ipcRenderer.on(channel, listener)
  },
  off(channel: string, listener: (...args: unknown[]) => void) {
    return ipcRenderer.off(channel, listener)
  },
  send(channel: string, ...args: unknown[]) {
    ipcRenderer.send(channel, ...args)
  },
  invoke(channel: string, ...args: unknown[]) {
    return ipcRenderer.invoke(channel, ...args)
  },
})

contextBridge.exposeInMainWorld('electronAPI', {
  auth: {
    register: (payload: { accountId: string; password: string; name: string }) =>
      ipcRenderer.invoke('auth:register', payload),
    login: (payload: { accountId: string; password: string }) =>
      ipcRenderer.invoke('auth:login', payload),
  },
  product: {
    list: () => ipcRenderer.invoke('product:list'),
    create: (payload: { name: string; price: number; quantity: number }) =>
      ipcRenderer.invoke('product:create', payload),
  },
})
