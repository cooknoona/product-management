import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

const SCRYPT_OPTS = { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 } as const

export function hashPassword(plain: string): string {
  const salt = randomBytes(16)
  const hash = scryptSync(plain, salt, 64, SCRYPT_OPTS)
  return `${salt.toString('hex')}:${hash.toString('hex')}`
}

export function verifyPassword(plain: string, stored: string): boolean {
  const [saltHex, hashHex] = stored.split(':')
  if (!saltHex || !hashHex) return false
  const salt = Buffer.from(saltHex, 'hex')
  const expected = Buffer.from(hashHex, 'hex')
  const hash = scryptSync(plain, salt, 64, SCRYPT_OPTS)
  if (hash.length !== expected.length) return false
  return timingSafeEqual(hash, expected)
}
