import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'

import AuthedHeader from './components/AuthedHeader'
import UnauthedHeader from './components/UnauthedHeader'
import Routes from './routes'

const DEBUG_AUTH = true

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            { DEBUG_AUTH ? <AuthedHeader /> : <UnauthedHeader /> }
            <Routes />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
