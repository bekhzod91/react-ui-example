import {
  compose, curry, prop, find, equals, either, both, ifElse, not, has, append, always, __, reduce, map, head
} from 'ramda'
import sprintf from 'sprintf'

const skipPermission = compose(not, has('permission'))
const hasPermission = curry((permissions, menu) =>
  compose(
    (permission) => find(equals(permission), permissions),
    prop('permission')
  )(menu)
)

export const getMenusByPermissions = curry((menus, permissions) => {
  const getMenuByPermissions = curry((menu, value) =>
    ifElse(
      either(skipPermission, hasPermission(permissions)),
      append(__, value),
      always(value)
    )(menu)
  )
  const getChildMenuByPermissions = curry((menu, value) =>
    ifElse(
      either(skipPermission, hasPermission(permissions)),
      (menu) => append({
        ...menu, children: getMenusByPermissions(prop('children', menu), permissions)
      }, value),
      always(value)
    )(menu)
  )

  return reduce((value, next) => ifElse(
    has('children'),
    getChildMenuByPermissions(__, value),
    getMenuByPermissions(__, value)
  )(next), [], menus)
})

export const getMenuWithCompanyId = curry((menus, companyId) => {
  const appendCompanyIdToUrl = (url) => sprintf(url, companyId)
  const appendCompanyIdToMenu = (menu) => ({ ...menu, url: appendCompanyIdToUrl(prop('url', menu)) })
  const getChildMenuWithCompanyId = (menu) => ({
    ...appendCompanyIdToMenu(menu), children: getMenuWithCompanyId(prop('children', menu), companyId)
  })

  return map(ifElse(
    has('children'),
    getChildMenuWithCompanyId,
    appendCompanyIdToMenu
  ), menus)
})

export const checkMenuNameInsideMenu = curry((activeMenuName, menu) => {
  const checkForActive = compose(
    equals(activeMenuName),
    prop('name'),
  )
  const checkChildren = compose(
    head,
    map(checkMenuNameInsideMenu(activeMenuName)),
    prop('children')
  )

  return ifElse(
    both(has('children'), compose(not, checkForActive)),
    checkChildren,
    checkForActive
  )(menu)
})
