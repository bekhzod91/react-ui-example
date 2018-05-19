import moment from 'moment/moment'
import { getFormValuesLikeParams, getParamsLikeFormValues, serializer } from '../../src/helpers/form'

describe('form', () => {
  /**
   * Testing getFormValuesLikeParams function
   */
  describe('getFormValuesLikeParams', () => {
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

    it('with date ', () => {
      const time = moment()
      const args = { date: time }
      const ret = { date: `date:${time.format('X')}` }

      expect(getFormValuesLikeParams(args)).to.eql(ret)
    })

    it('with date to date', () => {
      const time = moment()
      const args = { date: { startDate: time, endDate: time } }
      const ret = { date: `d2d:${time.format('X')}-${time.format('X')}` }

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

  /**
   * Testing getParamsLikeFormValues function
   */
  describe('getParamsLikeFormValues', () => {
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

  describe('serializer', () => {
    it('key to snakeCase', () => {
      const args = { ownerEmail: 'admin@example.com' }
      const ret = { 'owner_email': 'admin@example.com' }

      expect(serializer(args)).to.eql(ret)
    })

    it('key rename', () => {
      const args = { rowsPerPage: 1 }
      const ret = { 'page_size': 1 }

      expect(serializer(args)).to.eql(ret)
    })

    it('object to id', () => {
      const args = { owner: { id: 1, name: 'Name' } }
      const ret = { owner: 1 }

      expect(serializer(args)).to.eql(ret)
    })

    it('object list to id list', () => {
      const args = { members: [{ id: 1, name: 'Name 1' }, { id: 2, name: 'Name 1' }] }
      const ret = { members: [1, 2] }

      expect(serializer(args)).to.eql(ret)
    })

    it('moment to date', () => {
      const time = moment()
      const args = { createdDate: time }
      const ret = { 'created_date': time.format('YYYY-MM-DD') }

      expect(serializer(args)).to.eql(ret)
    })

    it('d2d to date', () => {
      const time = moment()
      const args = { createDate: { startDate: time, endDate: time } }
      const ret = { 'create_date_0': time.format('YYYY-MM-DD'), 'create_date_1': time.format('YYYY-MM-DD') }

      expect(serializer(args)).to.eql(ret)
    })

    it('ordering to snake', () => {
      const args = { ordering: '-createDate,tnvedNumber' }
      const ret = { ordering: '-create_date,tnved_number' }

      expect(serializer(args)).to.eql(ret)
    })
  })
})
