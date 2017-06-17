import {
  COUNTER_INCREMENT
} from 'routes/Counter/modules/counter'

describe('(Redux Module) Counter', () => {
  it('Should export a constant COUNTER_INCREMENT.', () => {
    expect(COUNTER_INCREMENT).to.equal('COUNTER_INCREMENT')
  })
})
