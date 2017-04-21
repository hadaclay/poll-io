import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class AuthedHeader extends Component {
  constructor(props) {
    super(props)
    this.state = { activeItem: null }
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted size="large" className="fixed">
        <div className="ui container">
          <Menu.Item header>
            <h3>Poll.io</h3>
          </Menu.Item>
          <Menu.Item name="home" active={activeItem === 'home'} onClick={this.handleItemClick} >
            <Link to="/polls">Home</Link>
          </Menu.Item>
          <Menu.Item name="myPolls" active={activeItem === 'myPolls'} onClick={this.handleItemClick}>
            <Link to="/mypolls">My Polls</Link>
          </Menu.Item>
          <Menu.Item name="newPoll" active={activeItem === 'newPoll'} onClick={this.handleItemClick}>
            <Link to="/newpoll">New Poll</Link>
          </Menu.Item>
          <Menu.Item position="right">
            Logout
          </Menu.Item>
        </div>
      </Menu>
    )
  }
}

export default AuthedHeader
