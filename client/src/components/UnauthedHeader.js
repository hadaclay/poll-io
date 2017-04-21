import React from 'react'
import { Button, Menu } from 'semantic-ui-react'

const UnauthedHeader = props => (
  <Menu inverted size="large" className="fixed">
    <div className="ui one column container">
      <Menu.Item header>
        <h3>Poll.io</h3>
      </Menu.Item>
      <Menu.Item name="home">Home</Menu.Item>
      <Menu.Item position="right">
        <Button primary>Sign in with Twitter</Button>
      </Menu.Item>
    </div>
  </Menu>
)

export default UnauthedHeader
