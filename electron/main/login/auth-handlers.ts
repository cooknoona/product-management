import { ipcMain } from 'electron'
import { AppErrorCode, err } from '../../../shared/app-errors'
import { runIpcHandler } from '../errors/handle-ipc'
import { getDatabase } from '../database/connection'
import { verifyPassword } from './password'

type LoginPayload = { accountId: string; password: string }

export function registerAuthHandlers(): void {
  ipcMain.handle('auth:login', async (_evt, payload: LoginPayload) => {
    return runIpcHandler(async () => {
      const db = getDatabase()
      if (!db) return err(AppErrorCode.SERVICE_UNAVAILABLE)

      const accountId = payload.accountId?.trim()
      const password = payload.password

      if (!accountId || !password) {
        return err(AppErrorCode.INVALID_INPUT)
      }

      const row = db
        .prepare(
          'SELECT account_id AS accountId, password, name FROM user WHERE account_id = ?',
        )
        .get(accountId) as
        | { accountId: string; password: string; name: string }
        | undefined

      if (!row || !verifyPassword(password, row.password)) {
        return err(AppErrorCode.INVALID_CREDENTIALS)
      }

      return {
        ok: true as const,
        user: { accountId: row.accountId, name: row.name },
      }
    })
  })
}
