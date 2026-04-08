import { registerAuthHandlers } from '../login/auth-handlers'
import { registerHomeHandlers } from '../home/home-handlers'
import { registerProductHandlers } from '../product/product-handlers'

export function registerAllIpcHandlers(): void {
  registerAuthHandlers()
  registerHomeHandlers()
  registerProductHandlers()
}
