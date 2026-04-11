/// <reference types="vite/client" />

import type { AppErrorCodeValue } from '../shared/app-errors'

export type AuthUser = { accountId: string; name: string }

export type AuthLoginResult =
  | { ok: true; user: AuthUser }
  | { ok: false; code: AppErrorCodeValue }

export type ProductDto = {
  id: number
  name: string
  price: number
  quantity: number
  registeredAt: string
}

export type ProductListResult =
  | { ok: true; products: ProductDto[] }
  | { ok: false; code: AppErrorCodeValue }

export type ProductCreateResult =
  | { ok: true; product: ProductDto }
  | { ok: false; code: AppErrorCodeValue }

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
