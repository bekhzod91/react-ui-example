import * as R from 'ramda'
import sprintf from 'sprintf'

export const getMenuWithCompanyId = R.curry((menus, companyId) => {
  const appendCompanyIdToUrl = (url) => sprintf(url, companyId)
  const appendCompanyIdToMenu = (menu) => ({ ...menu, url: appendCompanyIdToUrl(R.prop('url', menu)) })
  const getChildMenuWithCompanyId = (menu) => ({
    ...appendCompanyIdToMenu(menu), children: getMenuWithCompanyId(R.prop('children', menu), companyId)
  })

  return R.map(R.ifElse(
    R.has('children'),
    getChildMenuWithCompanyId,
    appendCompanyIdToMenu
  ), menus)
})

export const getMenusByPermissions = R.curry((menus, permissions) => {
  const skipPermission = R.compose(R.not, R.has('permission'))
  const hasPermission = R.compose(
    (permission) => R.find(R.equals(permission), permissions),
    R.prop('permission')
  )
  const getMenuByPermissions = R.curry((menu, value) =>
    R.ifElse(
      R.either(skipPermission, hasPermission),
      R.append(R.__, value),
      R.always(value)
    )(menu)
  )
  const getChildMenuByPermissions = R.curry((menu, value) =>
    R.ifElse(
      R.either(skipPermission, hasPermission),
      (menu) => R.append({
        ...menu, children: getMenusByPermissions(R.prop('children', menu), permissions)
      }, value),
      R.always(value)
    )(menu)
  )

  return R.reduce((value, next) => R.ifElse(
    R.has('children'),
    getChildMenuByPermissions(R.__, value),
    getMenuByPermissions(R.__, value)
  )(next), [], menus)
})
