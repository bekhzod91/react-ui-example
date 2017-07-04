import {
  SIGN_IN,
  singInAction,
  default as signInReducer
} from 'routes/Auth/modules/signIn'

describe('(Redux Module) SignIn', () => {
  it('Should export a constant SIGN_IN.', () => {
    expect(SIGN_IN).to.equal('SIGN_IN')
  })

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(signInReducer).to.be.a('function')
    })
  })
  describe('(Action SignIn) singInAction', () => {
    it('Should be exported as a function.', () => {
      expect(singInAction).to.be.a('function')
    })

    it('Should return an action with type "SIGN_IN".', () => {
      expect(singInAction()).to.have.property('type', SIGN_IN)
    })

    it('Should return', () => {
      expect(singInAction()).to.have.property('type', SIGN_IN)
    })
  })
})
