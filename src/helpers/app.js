import { propOr, prop } from 'ramda'

export const getDefaultProps = (props) => ({
  permissions: propOr([], 'permissions', props),
  username: prop('username', props) || 'Unknown',
  logout: prop('logout', props),
})
