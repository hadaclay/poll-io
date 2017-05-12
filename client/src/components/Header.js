import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Menu, Button, Icon } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

import AuthService from '../utils/AuthService'

class Header extends Component {
  render() {
    const Authed = (
      <Menu inverted size="large" className="fixed">
        <div className="ui container">
          <Menu.Item header>
            <h3>Poll.io</h3>
          </Menu.Item>
          <Menu.Item name="home">
            <NavLink to="/polls">Home</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/mypolls">My Polls</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/newpoll">New Poll</NavLink>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              {this.props.name}
            </Menu.Item>
            <Menu.Item>
              <a href="#" onClick={this.props.auth.logout}>Logout</a>
            </Menu.Item>
          </Menu.Menu>
        </div>
      </Menu>
    )

    const Unauthed = (
      <Menu inverted size="large" className="fixed">
        <div className="ui one column container">
          <Menu.Item header>
            <h3>Poll.io</h3>
          </Menu.Item>
          <Menu.Item name="home">
            <NavLink to="/polls">Home</NavLink>
          </Menu.Item>
          <Menu.Item position="right">
            <Button color="twitter" onClick={this.props.auth.login.bind(this)}>
              <Icon name="twitter" /> Sign in with Twitter
            </Button>
          </Menu.Item>
        </div>
      </Menu>
    )

    return this.props.auth.loggedIn() ? Authed : Unauthed
  }
}

Header.propTypes = {
  name: PropTypes.string,
  auth: PropTypes.instanceOf(AuthService).isRequired
}

Header.defaultProps = {
  name: ''
}

export default Header
