import { AppErrorCode, type AppErrorCodeValue } from '@shared/app-errors'

const messages: Record<AppErrorCodeValue, string> = {
  [AppErrorCode.INVALID_INPUT]: '입력값을 확인해 주세요.',
  [AppErrorCode.INVALID_CREDENTIALS]: '계정 또는 비밀번호가 올바르지 않습니다.',
  [AppErrorCode.INVALID_PRODUCT_NAME]: '상품 이름을 확인해 주세요.',
  [AppErrorCode.INVALID_PRODUCT_PRICE]: '가격을 확인해 주세요.',
  [AppErrorCode.INVALID_PRODUCT_QUANTITY]: '수량을 확인해 주세요.',
  [AppErrorCode.INTERNAL]: '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
  [AppErrorCode.SERVICE_UNAVAILABLE]: '데이터베이스에 연결할 수 없습니다.',
}

export function getAppErrorMessage(code: AppErrorCodeValue): string {
  return messages[code] ?? messages[AppErrorCode.INTERNAL]
}
