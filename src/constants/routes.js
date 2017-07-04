// SIGN IN ROUTES
export const SIGN_IN = 'sign-in'
export const SIGN_IN_URL = `/${SIGN_IN}`

// RECOVERY ROUTES
export const RECOVERY = 'recovery'
export const RECOVERY_URL = `/${RECOVERY}`

// RESET PASSWORD
export const RESET_PASSWORD = 'reset-password'
export const RESET_PASSWORD_URL = `/${RESET_PASSWORD}/:code`

// SIGN UP ROUTES
export const SIGN_UP = `sign-up`
export const SIGN_UP_URL = `/${SIGN_UP}`
export const SIGN_UP_VERIFY_URL = `/${SIGN_UP}-verify/:code`

// COMPANY ROUTES
export const COMPANY_MY = 'c'
export const COMPANY_MY_LIST_URL = `/${COMPANY_MY}`
export const COMPANY_MY_URL = `${COMPANY_MY_LIST_URL}/:id`
export const COMPANY_MY_PATH = `${COMPANY_MY_LIST_URL}/%d`
