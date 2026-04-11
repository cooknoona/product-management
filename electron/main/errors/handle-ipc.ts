import { AppErrorCode, err, type AppErrorCodeValue } from '../../../shared/app-errors'

/**
 * IPC 핸들러 본문에서 예외가 나면 내부 오류 코드로 정규화합니다.
 * (Java의 상위 ExceptionHandler에 가까운 역할)
 */
export async function runIpcHandler<T extends { ok: true } | { ok: false; code: AppErrorCodeValue }>(
  fn: () => Promise<T>,
): Promise<T | ReturnType<typeof err>> {
  try {
    return await fn()
  } catch {
    return err(AppErrorCode.INTERNAL)
  }
}
