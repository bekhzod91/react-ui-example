import toCamelCase from '../../src/helpers/toCamelCase'

describe('toCamelCase helper', () => {
  it('check toCamelCase', () => {
    const args = { 'test_test': 'test', 'data': [{ 'test_test': 'test' }] }
    const ret = { testTest: 'test', 'data': [{ testTest: 'test' }] }

    expect(toCamelCase(args)).to.eql(ret)
  })
})
