import Auth from 'routes/Auth'

describe('(Route) Auth', () => {
  it('returns a route configuration object', () => {
    expect(typeof Auth({})).to.equal('object')
  })

  it('has a path \'counter\'', () => {
    expect(Auth({}).path).to.equal('sign-in')
  })
})
