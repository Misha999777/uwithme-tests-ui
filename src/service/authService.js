import * as Config from '../config'

let userInfo = null

export const authService = {
  async init() {
    const response = await fetch('/oauth2/userinfo')
    if (!response.ok) {
      this.login()
      return
    }
    userInfo = await response.json()
  },

  isLoggedIn() {
    return userInfo !== null
  },

  login() {
    const rd = window.location.pathname + window.location.search
    window.location.assign('/oauth2/start?rd=' + encodeURIComponent(rd))
  },

  logout() {
    window.location.assign('/oauth2/sign_out?rd=/')
  },
}

export function hasAdminRole() {
  return authService.isLoggedIn() && userInfo.groups
    ?.some(group => Config.ADMIN_ROLES.includes(group))
}
