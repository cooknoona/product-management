import { ipcMain } from 'electron'
import { getDatabase } from '../database/connection'
import { hashPassword, verifyPassword } from './password'

type RegisterPayload = { accountId: string; password: string; name: string }
type LoginPayload = { accountId: string; password: string }

export function registerAuthHandlers(): void {
  ipcMain.handle('auth:register', async (_evt, payload: RegisterPayload) => {
    const db = getDatabase()
    if (!db) return { ok: false as const, error: 'db_unavailable' }

    const accountId = payload.accountId?.trim()
    const name = payload.name?.trim()
    const password = payload.password

    if (!accountId || !name || !password) {
      return { ok: false as const, error: 'invalid_input' }
    }

    try {
      const hashed = hashPassword(password)
      db.prepare(
        'INSERT INTO user (account_id, password, name) VALUES (?, ?, ?)',
      ).run(accountId, hashed, name)
      return { ok: true as const }
    } catch {
      return { ok: false as const, error: 'duplicate_account' }
    }
  })

  ipcMain.handle('auth:login', async (_evt, payload: LoginPayload) => {
    const db = getDatabase()
    if (!db) return { ok: false as const, error: 'db_unavailable' }

    const accountId = payload.accountId?.trim()
    const password = payload.password

    if (!accountId || !password) {
      return { ok: false as const, error: 'invalid_input' }
    }

    const row = db
      .prepare(
        'SELECT account_id AS accountId, password, name FROM user WHERE account_id = ?',
      )
      .get(accountId) as
      | { accountId: string; password: string; name: string }
      | undefined

    if (!row || !verifyPassword(password, row.password)) {
      return { ok: false as const, error: 'invalid_credentials' }
    }

    return {
      ok: true as const,
      user: { accountId: row.accountId, name: row.name },
    }
  })
}
