import Database from 'better-sqlite3'
import path from 'node:path'
import { app } from 'electron'
import { getAppRoot } from '../app/env'
import { applySchema } from './schema'

let db: Database.Database | null = null

export function getDbPath(): string {
  return path.join(app.getPath('userData'), 'inventory.db')
}

export function initDatabase(): Database.Database {
  if (db) return db
  getAppRoot()
  db = new Database(getDbPath())
  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')
  applySchema(db)
  return db
}

export function getDatabase(): Database.Database | null {
  return db
}

export function closeDatabase(): void {
  if (db) {
    db.close()
    db = null
  }
}
