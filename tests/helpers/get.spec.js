import { equals } from 'ramda'
import { getFormValuesToUrl } from '../../src/helpers/get'

describe('get helper', () => {
  it('check getFormValuesToUrl', () => {
    const before = {
      email: 'admin@example.com',
      company: {
        id: 1
      },
      owners: [
        {
          id: 1
        },
        {
          id: 2
        }
      ],
      name: ['admin', 'user']
    }

    const after = {
      email: 'admin@example.com',
      company: 1,
      owners: '1,2',
      name: 'admin,user'
    }

    expect(equals(getFormValuesToUrl(before), after)).to.equal(true)
  })
})
