import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Header from './components/Header'
import Routes from './routes'

import AuthService from './utils/AuthService'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      auth: new AuthService(process.env.REACT_APP_CLIENT_ID, process.env.REACT_APP_AUTH_DOMAIN),
      profile: {},
      name: '',
      clientID: ''
    }
  }

  componentWillMount() {
    // eslint-disable-next-line
    const profileData = JSON.parse(localStorage.getItem('profile'))
    if (profileData !== null) {
      this.setState({
        profile: profileData,
        name: profileData.name,
        clientID: profileData.clientID
      })
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header auth={this.state.auth} name={this.state.name} />
          <Routes auth={this.state.auth} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
