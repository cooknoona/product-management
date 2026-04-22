import { AppErrorCode, type AppErrorCodeValue } from '@shared/app-errors'
import type { MessageKey } from './messages.ko'

export const appErrorToMessageKey: Record<AppErrorCodeValue, MessageKey> = {
  [AppErrorCode.INVALID_INPUT]: 'error.invalidInput',
  [AppErrorCode.INVALID_CREDENTIALS]: 'error.invalidCredentials',
  [AppErrorCode.INVALID_PRODUCT_NAME]: 'error.invalidProductName',
  [AppErrorCode.INVALID_PRODUCT_PRICE]: 'error.invalidProductPrice',
  [AppErrorCode.INVALID_PRODUCT_QUANTITY]: 'error.invalidProductQuantity',
  [AppErrorCode.INTERNAL]: 'error.internal',
  [AppErrorCode.SERVICE_UNAVAILABLE]: 'error.serviceUnavailable',
}

export function getMessageKeyForError(code: AppErrorCodeValue): MessageKey {
  return appErrorToMessageKey[code] ?? 'error.internal'
}
