// SIGN IN ROUTES
export const SIGN_IN = 'sign-in'
export const SIGN_IN_URL = `/${SIGN_IN}`

// RECOVERY ROUTES
export const RECOVERY = 'recovery'
export const RECOVERY_URL = `/${RECOVERY}`

// RECOVERY THANK YOU ROUTES
export const RECOVERY_THANK_YOU = 'thank-you'
export const RECOVERY_THANK_YOU_URL = `/${RECOVERY}/${RECOVERY_THANK_YOU}`

// RESET PASSWORD
export const RESET_PASSWORD = 'reset-password'
export const RESET_PASSWORD_URL = `/${RESET_PASSWORD}/:code`

// SIGN UP ROUTES
export const SIGN_UP = 'sign-up'
export const SIGN_UP_URL = `/${SIGN_UP}`
export const SIGN_UP_VERIFY_URL = `/${SIGN_UP}-verify/:code`

// SIGN UP THANK YOU ROUTE
export const SIGN_UP_THANK_YOU = 'thank-you'
export const SIGN_UP_THANK_YOU_URL = `/${SIGN_UP}/${SIGN_UP_THANK_YOU}`

// SIGN UP THANK YOU ROUTE
export const SIGN_UP_RESEND_MESSAGE = 'resend'
export const SIGN_UP_RESEND_MESSAGE_URL = `/${SIGN_UP}/${SIGN_UP_RESEND_MESSAGE}`

// SIGN UP THANK YOU ROUTE
export const SIGN_UP_EMAIL_CONFIRM = 'confirm'
export const SIGN_UP_EMAIL_CONFIRM_URL = `/${SIGN_UP}/${SIGN_UP_EMAIL_CONFIRM}/:code`

// INTERNAL SERVER ERROR PAGE
export const INTERNAL_SERVER_ERROR = '500'
export const INTERNAL_SERVER_ERROR_URL = `/${INTERNAL_SERVER_ERROR}`

// DASHBOARD
export const DASHBOARD = 'dashboard'
export const DASHBOARD_URL = `/${DASHBOARD}`
export const DASHBOARD_PATH = `/${DASHBOARD}`

// USER ROUTE
export const USER = 'users'
export const USER_LIST_URL = `/${USER}`
export const USER_DETAIL_URL = `${USER_LIST_URL}/:id`
export const USER_DETAIL_PATH = `${USER_LIST_URL}/%d`

// COMPANY ROUTES
export const COMPANY = 'company'
export const COMPANY_LIST_PATH = `/${COMPANY}`
export const COMPANY_DETAIL_PATH = `${COMPANY_LIST_PATH}/:id`
export const COMPANY_DETAIL_TAB_PATH = `${COMPANY_LIST_PATH}/:id/:tab`
export const COMPANY_DETAIL_URL = `${COMPANY_LIST_PATH}/%d`
export const COMPANY_DETAIL_TAB_URL = `${COMPANY_LIST_PATH}/%d/%s`

// COMMON ROUTE
export const COMMON = 'common'
export const COMMON_SETTINGS = `${COMMON}/settings`
export const COMMON_SETTINGS_URL = `/${COMMON_SETTINGS}`
export const COMMON_SETTINGS_PATH = `/${COMMON_SETTINGS}`
