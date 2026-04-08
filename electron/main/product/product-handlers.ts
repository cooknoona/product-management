import { ipcMain } from 'electron'
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
    const db = getDatabase()
    if (!db) return { ok: false as const, error: 'db_unavailable' }

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

  ipcMain.handle('product:create', async (_evt, payload: CreatePayload) => {
    const db = getDatabase()
    if (!db) return { ok: false as const, error: 'db_unavailable' }

    const name = payload.name?.trim()
    if (!name) return { ok: false as const, error: 'invalid_name' }

    const price = Number(payload.price)
    const quantity = Math.trunc(Number(payload.quantity))
    if (!Number.isFinite(price) || price < 0) {
      return { ok: false as const, error: 'invalid_price' }
    }
    if (!Number.isFinite(quantity) || quantity < 0) {
      return { ok: false as const, error: 'invalid_quantity' }
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
}
