import { getDatabase } from '../database/connection'
import { hashPassword } from './password'

const ADMIN_ACCOUNT_ID = 'admin'
const ADMIN_PASSWORD = '1234'
const ADMIN_NAME = '관리자'

export function runAdminInitialiser(): void {
  const db = getDatabase()
  if (!db) return

  const hashed = hashPassword(ADMIN_PASSWORD)
  db.prepare(
    'INSERT OR IGNORE INTO user (account_id, password, name) VALUES (?, ?, ?)',
  ).run(ADMIN_ACCOUNT_ID, hashed, ADMIN_NAME)
}
