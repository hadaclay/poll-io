import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'


import AuthedHeader from './components/AuthedHeader'
import UnauthedHeader from './components/UnauthedHeader'

import MyPolls from './routes/MyPolls'
import NewPoll from './routes/NewPoll'
import Polls from './routes/Polls'
import PollPage from './routes/PollPage'

const DEBUG_AUTH = true

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            {DEBUG_AUTH ? <AuthedHeader /> : <UnauthedHeader />}
            <Route exact path="/" render={() => <Redirect to="/polls" />} />
            <Route exact path="/polls" component={Polls} />
            <Route path="/polls/:pollID" component={PollPage} />
            <Route path="/mypolls" component={MyPolls} />
            <Route path="/newpoll" component={NewPoll} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
