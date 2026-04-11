import { ipcMain } from 'electron'
import { AppErrorCode, err } from '../../../shared/app-errors'
import { runIpcHandler } from '../errors/handle-ipc'
import { getDatabase } from '../database/connection'

export type ProductRow = {
  id: number
  name: string
  price: number
  quantity: number
  registeredAt: string
}

type CreatePayload = { name: string; price: number; quantity: number }

export function registerProductHandlers(): void {
  ipcMain.handle('product:list', async () => {
    return runIpcHandler(async () => {
      const db = getDatabase()
      if (!db) return err(AppErrorCode.SERVICE_UNAVAILABLE)

      const rows = db
        .prepare(
          `
        SELECT id, name, price, quantity, registered_at AS registeredAt
        FROM product
        ORDER BY id DESC
      `,
        )
        .all() as ProductRow[]

      return { ok: true as const, products: rows }
    })
  })

  ipcMain.handle('product:create', async (_evt, payload: CreatePayload) => {
    return runIpcHandler(async () => {
      const db = getDatabase()
      if (!db) return err(AppErrorCode.SERVICE_UNAVAILABLE)

      const name = payload.name?.trim()
      if (!name) return err(AppErrorCode.INVALID_PRODUCT_NAME)

      const price = Number(payload.price)
      const quantity = Math.trunc(Number(payload.quantity))
      if (!Number.isFinite(price) || price < 0) {
        return err(AppErrorCode.INVALID_PRODUCT_PRICE)
      }
      if (!Number.isFinite(quantity) || quantity < 0) {
        return err(AppErrorCode.INVALID_PRODUCT_QUANTITY)
      }

      const result = db
        .prepare(
          `
        INSERT INTO product (name, price, quantity)
        VALUES (?, ?, ?)
      `,
        )
        .run(name, price, quantity)

      const id = Number(result.lastInsertRowid)
      const row = db
        .prepare(
          `
        SELECT id, name, price, quantity, registered_at AS registeredAt
        FROM product WHERE id = ?
      `,
        )
        .get(id) as ProductRow

      return { ok: true as const, product: row }
    })
  })
}
