import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import UserPolls from './UserPolls'
import NewPoll from './NewPoll'
import Polls from './Polls'
import PollPage from './PollPage'
import Login from './Login'
import AuthService from '../utils/AuthService'

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.loggedIn()
        ? <Component {...props} />
        : <Redirect
          to={{
            pathname: '/polls',
            state: { from: props.location }
          }}
        />}
  />
)

PrivateRoute.propTypes = {
  auth: PropTypes.instanceOf(AuthService).isRequired,
  location: PropTypes.object
}

const Routes = props => (
  <div>
    <Route exact path="/" render={() => <Redirect to="/polls" />} />
    <Route exact path="/polls" component={Polls} />
    <Route path="/polls/:pollID" component={PollPage} />
    <Route path="/login/return" render={() => <Login auth={props.auth} />} />
    <PrivateRoute auth={props.auth} path="/mypolls" component={UserPolls} />
    <PrivateRoute auth={props.auth} path="/newpoll" component={NewPoll} />
  </div>
)

Routes.propTypes = {
  auth: PropTypes.instanceOf(AuthService).isRequired
}

export default Routes
