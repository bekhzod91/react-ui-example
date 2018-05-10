import { injectReducers } from '../../store/reducers'
import AppLayout from '../../components/Layouts/AppLayout'
import { AsyncComponent } from '../../components/Layouts/RouterLayout'
import * as ROUTE from '../../constants/routes'

const getRecoveryContainer = (store) =>
  import(/* webpackChunkName: "auth" */ './reducers')
    .then((module) => injectReducers(store, module.default))
    .then(() => import(/* webpackChunkName: "auth" */ './containers/RecoveryContainer'))
    .then(module => module.default)

const getRecoveryThankYouContainer = (store) =>
  import(/* webpackChunkName: "auth" */ './reducers')
    .then((module) => injectReducers(store, module.default))
    .then(() => import(/* webpackChunkName: "auth" */ './containers/RecoveryThankYouContainer'))
    .then(module => module.default)

const getResetPasswordContainer = (store) =>
  import(/* webpackChunkName: "auth" */ './reducers')
    .then((module) => injectReducers(store, module.default))
    .then(() => import(/* webpackChunkName: "auth" */ './containers/ResetPasswordContainer'))
    .then(module => module.default)

const getSignUpContainer = (store) =>
  import(/* webpackChunkName: "auth" */ './reducers')
    .then((module) => injectReducers(store, module.default))
    .then(() => import(/* webpackChunkName: "auth" */ './containers/SignUpContainer'))
    .then(module => module.default)

const getSignUpThankYouContainer = (store) =>
  import(/* webpackChunkName: "auth" */ './reducers')
    .then((module) => injectReducers(store, module.default))
    .then(() => import(/* webpackChunkName: "auth" */ './containers/SignUpThankYouContainer'))
    .then(module => module.default)

const getSignUpResendMessageContainer = (store) =>
  import(/* webpackChunkName: "auth" */ './reducers')
    .then((module) => injectReducers(store, module.default))
    .then(() => import(/* webpackChunkName: "auth" */ './containers/SignUpResendMessageContainer'))
    .then(module => module.default)

const getSignUpEmailConfirmContainer = (store) =>
  import(/* webpackChunkName: "auth" */ './reducers')
    .then((module) => injectReducers(store, module.default))
    .then(() => import(/* webpackChunkName: "auth" */ './containers/SignUpEmailConfirmContainer'))
    .then(module => module.default)

const getSignInContainer = (store) =>
  import(/* webpackChunkName: "auth" */ './reducers')
    .then((module) => injectReducers(store, module.default))
    .then(() => import(/* webpackChunkName: "auth" */ './containers/SignInContainer'))
    .then(module => module.default)

export default (store) => ([
  {
    layout: AppLayout,
    path: ROUTE.SIGN_IN_URL,
    component: AsyncComponent(() => getSignInContainer(store))
  },
  {
    layout: AppLayout,
    path: ROUTE.SIGN_UP_URL,
    component: AsyncComponent(() => getSignUpContainer(store))
  },
  {
    layout: AppLayout,
    path: ROUTE.SIGN_UP_THANK_YOU_URL,
    component: AsyncComponent(() => getSignUpThankYouContainer(store))
  },
  {
    layout: AppLayout,
    path: ROUTE.SIGN_UP_RESEND_MESSAGE_URL,
    component: AsyncComponent(() => getSignUpResendMessageContainer(store))
  },
  {
    layout: AppLayout,
    path: ROUTE.SIGN_UP_EMAIL_CONFIRM_URL,
    component: AsyncComponent(() => getSignUpEmailConfirmContainer(store))
  },
  {
    layout: AppLayout,
    path: ROUTE.RECOVERY_URL,
    component: AsyncComponent(() => getRecoveryContainer(store))
  },
  {
    layout: AppLayout,
    path: ROUTE.RESET_PASSWORD_URL,
    component: AsyncComponent(() => getResetPasswordContainer(store))
  },
  {
    layout: AppLayout,
    path: ROUTE.RECOVERY_THANK_YOU_URL,
    component: AsyncComponent(() => getRecoveryThankYouContainer(store))
  }
])
