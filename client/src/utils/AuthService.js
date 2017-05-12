import Auth0Lock from 'auth0-lock'

export default class AuthService {
  constructor(clientId, domain) {
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: 'https://poll-io.herokuapp.com/login/return',
        responseType: 'token'
      }
    })

    this.lock.on('authenticated', this._doAuthentication.bind(this))
    this.login = this.login.bind(this)
  }

  _doAuthentication = authResult => {
    this.setAccess(authResult.idToken, authResult.accessToken)
    this.setProfile(authResult.accessToken)
  }

  login = () => this.lock.show()

  loggedIn = () => !!this.getIDToken()

  setAccess = (idToken, accessToken) => {
    // eslint-disable-next-line
    localStorage.setItem('id_token', idToken)
    // eslint-disable-next-line
    localStorage.setItem('accessToken', accessToken)
  }

  setProfile = accessToken => {
    this.lock.getUserInfo(accessToken, (err, profile) => {
      if (err) throw err

      const storedProfile = { name: profile.name, user_id: profile.user_id }

      // eslint-disable-next-line
      localStorage.setItem('profile', JSON.stringify(storedProfile))
    })
  }

  // eslint-disable-next-line
  getIDToken = () => localStorage.getItem('id_token')

  // eslint-disable-next-line
  getAccessToken = () => localStorage.getItem('accessToken')

  logout = () => {
    // eslint-disable-next-line
    localStorage.removeItem('id_token')
    // eslint-disable-next-line
    localStorage.removeItem('accessToken')
    // eslint-disable-next-line
    localStorage.removeItem('profile')
  }
}
