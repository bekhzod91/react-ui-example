import { equals } from 'ramda'
import { getFormValuesLikeParams, getParamsLikeFormValues } from '../../src/helpers/get'

describe('get helper', () => {
  it('check getFormValuesLikeParams', () => {
    const before = {
      email: 'admin@example.com',
      amount: 500,
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
      email: 'str:admin@example.com',
      amount: 'num:500',
      company: 'obj:1',
      owners: 'list:obj:1,obj:2',
      name: 'list:str:admin,str:user'
    }

    expect(equals(getFormValuesLikeParams(before), after)).to.equal(true)
  })

  it('check getParamsLikeFormValues', () => {
    const fields = ['email', 'amount', 'company', 'owners', 'name']
    const before = {
      email: 'str:admin@example.com',
      amount: 'num:500',
      company: 'obj:1',
      owners: 'list:obj:1,obj:2',
      name: 'list:str:admin,str:user',
      data: 'str:admin'
    }

    const after = {
      email: 'admin@example.com',
      amount: 500,
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

    expect(equals(getParamsLikeFormValues(fields, before), after)).to.equal(true)
  })
})
