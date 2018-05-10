import { getParamsLikeFormValues } from '../../src/helpers/form'

describe('check getParamsLikeFormValues', () => {
  it('with string', () => {
    const fields = ['email']
    const args = { email: 'str:admin@example.com' }
    const ret = { email: 'admin@example.com' }

    expect(getParamsLikeFormValues(fields, args)).to.eql(ret)
  })

  it('with multiple string', () => {
    const fields = ['name']
    const args = { name: 'list:str:admin,str:user' }
    const ret = { name: ['admin', 'user'] }

    expect(getParamsLikeFormValues(fields, args)).to.eql(ret)
  })

  it('with number', () => {
    const fields = ['amount']
    const args = { amount: 'num:500' }
    const ret = { amount: 500 }

    expect(getParamsLikeFormValues(fields, args)).to.eql(ret)
  })

  it('with multiple number', () => {
    const fields = ['ids']
    const args = { ids: 'list:num:1,num:2' }
    const ret = { ids: [1, 2] }

    expect(getParamsLikeFormValues(fields, args)).to.eql(ret)
  })

  it('with obj', () => {
    const fields = ['company']
    const args = { company: 'obj:1' }
    const ret = { company: { id: 1 } }

    expect(getParamsLikeFormValues(fields, args)).to.eql(ret)
  })

  it('with multiple obj', () => {
    const fields = ['owners']
    const args = { owners: 'list:obj:1,obj:2' }
    const ret = { owners: [{ id: 1 }, { id: 2 }] }

    expect(getParamsLikeFormValues(fields, args)).to.eql(ret)
  })

  it('mixing', () => {
    const fields = ['email', 'name', 'amount', 'ids', 'company', 'owners']
    const args = {
      email: 'str:admin@example.com',
      name: 'list:str:admin,str:user',
      amount: 'num:500',
      ids: 'list:num:1,num:2',
      company: 'obj:1',
      owners: 'list:obj:1,obj:2',
    }

    const ret = {
      email: 'admin@example.com',
      name: ['admin', 'user'],
      amount: 500,
      ids: [1, 2],
      company: { id: 1 },
      owners: [{ id: 1 }, { id: 2 }]
    }

    expect(getParamsLikeFormValues(fields, args)).to.eql(ret)
  })
})
