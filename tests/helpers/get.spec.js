import { getParamsCountFromLocation } from '../../src/helpers/get'

describe('get', () => {
  describe('check getParamsCountFromLocation', () => {
    it('with one arguments', () => {
      const fields = ['name']
      const args = { search: '?name=str:Myname' }
      const ret = 1

      expect(getParamsCountFromLocation(fields, args)).to.equal(ret)
    })

    it('with multiple arguments', () => {
      const fields = ['name', 'company']
      const args = { search: '?name=str:Myname&company=obj:1' }
      const ret = 2

      expect(getParamsCountFromLocation(fields, args)).to.equal(ret)
    })

    it('with empty params', () => {
      const fields = ['name', 'company']
      const args = { search: '?company=obj:1' }
      const ret = 1

      expect(getParamsCountFromLocation(fields, args)).to.equal(ret)
    })

    it('should skip params', () => {
      const fields = ['name']
      const args = { search: '?name=str:Myname&company=obj:1' }
      const ret = 1

      expect(getParamsCountFromLocation(fields, args)).to.equal(ret)
    })
  })
})
