import { getFormValuesLikeParams } from '../../src/helpers/get'

describe('check getFormValuesLikeParams', () => {
  it('with string', () => {
    const args = { email: 'admin@example.com' }
    const ret = { email: 'str:admin@example.com' }

    expect(getFormValuesLikeParams(args)).to.eql(ret)
  })

  it('with multiple string', () => {
    const args = { name: ['admin', 'user'] }
    const ret = { name: 'list:str:admin,str:user' }

    expect(getFormValuesLikeParams(args)).to.eql(ret)
  })

  it('with number', () => {
    const args = { amount: 500 }
    const ret = { amount: 'num:500' }

    expect(getFormValuesLikeParams(args)).to.eql(ret)
  })

  it('with multiple number', () => {
    const args = { ids: [1, 2] }
    const ret = { ids: 'list:num:1,num:2' }

    expect(getFormValuesLikeParams(args)).to.eql(ret)
  })

  it('with obj', () => {
    const args = { company: { id: 1 } }
    const ret = { company: 'obj:1' }

    expect(getFormValuesLikeParams(args)).to.eql(ret)
  })

  it('with multiple obj', () => {
    const args = { owners: [{ id: 1 }, { id: 2 }] }
    const ret = { owners: 'list:obj:1,obj:2' }

    expect(getFormValuesLikeParams(args)).to.eql(ret)
  })

  it('with empty string', () => {
    const args = { email: '' }
    const ret = { email: '' }

    expect(getFormValuesLikeParams(args)).to.eql(ret)
  })

  it('with undefined', () => {
    const args = { owners: undefined }
    const ret = { owners: '' }

    expect(getFormValuesLikeParams(args)).to.eql(ret)
  })

  it('with null', () => {
    const args = { owners: null }
    const ret = { owners: '' }

    expect(getFormValuesLikeParams(args)).to.eql(ret)
  })

  it('mixing', () => {
    const args = {
      email: 'admin@example.com',
      name: ['admin', 'user'],
      amount: 500,
      ids: [1, 2],
      company: { id: 1 },
      owners: [{ id: 1 }, { id: 2 }]
    }

    const ret = {
      email: 'str:admin@example.com',
      name: 'list:str:admin,str:user',
      amount: 'num:500',
      ids: 'list:num:1,num:2',
      company: 'obj:1',
      owners: 'list:obj:1,obj:2',
    }

    expect(getFormValuesLikeParams(args)).to.eql(ret)
  })
})
