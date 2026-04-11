/**
 * 앱 전역 IPC·비즈니스 오류 코드 (HTTP와 무관한 숫자 구간만 차용).
 * 렌더러·메인 프로세스 공통으로 import 합니다.
 */
export const AppErrorCode = {
  /** 입력값 누락·형식 오류 (일반) */
  INVALID_INPUT: 400,
  /** 인증 실패 */
  INVALID_CREDENTIALS: 401,
  /** 상품명 검증 실패 */
  INVALID_PRODUCT_NAME: 410,
  /** 가격 검증 실패 */
  INVALID_PRODUCT_PRICE: 411,
  /** 수량 검증 실패 */
  INVALID_PRODUCT_QUANTITY: 412,
  /** 예기치 않은 처리 오류 */
  INTERNAL: 500,
  /** DB 등 외부 의존 불가 */
  SERVICE_UNAVAILABLE: 503,
} as const

export type AppErrorCodeValue = (typeof AppErrorCode)[keyof typeof AppErrorCode]

export function isAppErrorCode(value: unknown): value is AppErrorCodeValue {
  return typeof value === 'number' && Number.isInteger(value) && Object.values(AppErrorCode).includes(value as AppErrorCodeValue)
}

export function err(code: AppErrorCodeValue) {
  return { ok: false as const, code }
}
