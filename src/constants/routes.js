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

// COMPANY_MY ROUTES
export const COMPANY_MY = 'c'
export const COMPANY_MY_LIST_URL = `/${COMPANY_MY}`
export const COMPANY_MY_URL = `${COMPANY_MY_LIST_URL}/:companyId`
export const COMPANY_MY_PATH = `${COMPANY_MY_LIST_URL}/%d`

// USER ROUTE
export const USER = 'users'
export const USER_LIST_URL = `${COMPANY_MY_URL}/${USER}`
export const USER_DETAIL_URL = `${USER_LIST_URL}/:id`
export const USER_DETAIL_PATH = `${USER_LIST_URL}/%d`

// COMPANY ROUTES
export const COMPANY = 'company'
export const COMPANY_LIST_URL = `${COMPANY_MY_URL}/${COMPANY}`
export const COMPANY_DETAIL_URL = `:id`
export const COMPANY_LIST_PATH = `${COMPANY_MY_PATH}/${COMPANY}`
export const COMPANY_DETAIL_PATH = `${COMPANY_LIST_PATH}/%d`
