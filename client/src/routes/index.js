import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import MyPolls from './MyPolls'
import NewPoll from './NewPoll'
import Polls from './Polls'
import PollPage from './PollPage'

const Routes = (props) => {
  return (
    <div>
      <Route exact path="/" render={() => <Redirect to="/polls" />} />
      <Route exact path="/polls" component={Polls} />
      <Route path="/polls/:pollID" component={PollPage} />
      <Route path="/mypolls" component={MyPolls} />
      <Route path="/newpoll" component={NewPoll} />
    </div>
  )
}

export default Routes
