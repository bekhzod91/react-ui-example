import * as R from 'ramda'
import {
  getMenuWithCompanyId,
  getMenusByPermissions,
  checkMenuNameInsideMenu
} from '../../src/helpers/menu'

describe('menu helper', () => {
  it('check checkMenuNameInsideMenu', () => {
    const menu = {
      name: 'settings',
      url: '/c/0/settings',
      title: 'Settings',
      children: [
        {
          name: 'company',
          url: '/c/0/company',
          title: 'Company'
        },
      ]
    }

    expect(checkMenuNameInsideMenu('settings', menu)).to.equal(true)
    expect(checkMenuNameInsideMenu('company', menu)).to.equal(true)
    expect(checkMenuNameInsideMenu('unknown', menu)).to.equal(false)
  })

  it('check getMenuWithCompanyId', () => {
    const companyId = 0
    const beforeMenus = [
      {
        name: 'dashboard',
        url: '/c/%d/dashboard',
        title: 'Dashboard'
      },
      {
        name: 'settings',
        url: '/c/%d/settings',
        title: 'Settings',
        children: [
          {
            name: 'company',
            url: '/c/%d/company',
            title: 'Company'
          },
        ]
      }
    ]

    const afterMenus = [
      {
        name: 'dashboard',
        url: '/c/0/dashboard',
        title: 'Dashboard'
      },
      {
        name: 'settings',
        url: '/c/0/settings',
        title: 'Settings',
        children: [
          {
            name: 'company',
            url: '/c/0/company',
            title: 'Company'
          },
        ]
      }
    ]

    expect(R.equals(getMenuWithCompanyId(beforeMenus, companyId), afterMenus))
      .to.equal(true)
  })

  it('check getMenusByPermissions', () => {
    const permissions = [
      'company'
    ]
    const beforeMenus = [
      {
        name: 'dashboard',
        url: '/c/0/dashboard',
        title: 'Dashboard'
      },
      {
        name: 'products',
        url: '/c/0/products',
        title: 'Products',
        permission: 'products',
        children: [
          {
            name: 'my-products',
            url: '/c/0/products/my',
            title: 'My Products',
          }
        ]
      },
      {
        name: 'settings',
        url: '/c/0/settings',
        title: 'Settings',
        children: [
          {
            permission: 'company',
            name: 'company',
            url: '/c/0/company',
            title: 'Company'
          },
          {
            permission: 'users',
            name: 'users',
            url: '/c/0/users',
            title: 'Company'
          },
        ]
      }
    ]

    const afterMenus = [
      {
        name: 'dashboard',
        url: '/c/0/dashboard',
        title: 'Dashboard'
      },
      {
        name: 'settings',
        url: '/c/0/settings',
        title: 'Settings',
        children: [
          {
            permission: 'company',
            name: 'company',
            url: '/c/0/company',
            title: 'Company'
          }
        ]
      }
    ]

    expect(R.equals(getMenusByPermissions(beforeMenus, permissions), afterMenus))
      .to.equal(true)
  })
})
