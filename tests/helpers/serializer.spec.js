import moment from 'moment'
import { serializer } from '../../src/helpers/form'

describe('serializer helper', () => {
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
    const args = { createDate: time }
    const ret = { 'create_date': time.format('YYYY-MM-DD') }

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
