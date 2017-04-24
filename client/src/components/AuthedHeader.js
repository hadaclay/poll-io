import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

class AuthedHeader extends Component {
  render() {
    return (
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
          <Menu.Item position="right">
            <a href="#">Logout</a>
          </Menu.Item>
        </div>
      </Menu>
    )
  }
}

export default AuthedHeader
