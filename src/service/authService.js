import { AuthService } from 'auth-oidc'

import * as Config from '../config'

export const authService = new AuthService({
  authority: Config.AUTHORITY,
  clientId: Config.CLIENT_ID,
  autoLogin: true,
})

export function hasAdminRole() {
  return authService.isLoggedIn() && authService.getUserInfo('roles')
    ?.some(role => Config.ADMIN_ROLES.includes(role))
}
