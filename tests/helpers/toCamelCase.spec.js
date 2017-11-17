import * as R from 'ramda'
import toCamelCase from '../../src/helpers/toCamelCase'

describe('toCamelCase helper', () => {
  it('check toCamelCase', () => {
    const before = {
      'test_test': 'test',
      'data': [
        {
          'test_test': 'test'
        }
      ]
    }

    const after = {
      testTest: 'test',
      'data': [
        {
          testTest: 'test'
        }
      ]
    }

    expect(R.equals(toCamelCase(before), after)).to.equal(true)
  })
})
