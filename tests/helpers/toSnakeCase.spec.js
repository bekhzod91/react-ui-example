import { toSnake } from '../../src/helpers/toSnakeCase'

describe('toCamelCase helper', () => {
  it('camel case to snake case', () => {
    expect(toSnake('helloWorld')).to.equal('hello_world')
  })

  it('dot replace two underscore', () => {
    expect(toSnake('data.helloWorld')).to.equal('data__hello_world')
  })
})
