/// <reference types="vite/client" />

export type AuthUser = { accountId: string; name: string }

export type AuthRegisterResult =
  | { ok: true }
  | { ok: false; error: string }

export type AuthLoginResult =
  | { ok: true; user: AuthUser }
  | { ok: false; error: string }

export type ProductDto = {
  id: number
  name: string
  price: number
  quantity: number
  registeredAt: string
}

export type ProductListResult =
  | { ok: true; products: ProductDto[] }
  | { ok: false; error: string }

export type ProductCreateResult =
  | { ok: true; product: ProductDto }
  | { ok: false; error: string }

declare global {
  interface Window {
    ipcRenderer: {
      on: (
        channel: string,
        listener: (event: import('electron').IpcRendererEvent, ...args: unknown[]) => void,
      ) => Electron.IpcRenderer
      off: (channel: string, listener: (...args: unknown[]) => void) => Electron.IpcRenderer
      send: (channel: string, ...args: unknown[]) => void
      invoke: (channel: string, ...args: unknown[]) => Promise<unknown>
    }
    electronAPI: {
      auth: {
        register: (payload: {
          accountId: string
          password: string
          name: string
        }) => Promise<AuthRegisterResult>
        login: (payload: {
          accountId: string
          password: string
        }) => Promise<AuthLoginResult>
      }
      product: {
        list: () => Promise<ProductListResult>
        create: (payload: {
          name: string
          price: number
          quantity: number
        }) => Promise<ProductCreateResult>
      }
    }
  }
}

export {}
