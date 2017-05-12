import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Container, Segment, Header, Divider, Loader } from 'semantic-ui-react'

class Login extends Component {
  serverAuth = () => {
    // Add user to DB
    const profile = JSON.parse(localStorage.getItem('profile'))
    fetch('/api/user', {
      headers: {
        authorization: `Bearer ${localStorage.getItem('id_token')}`,
        userid: profile.user_id
      },
      method: 'POST'
    }).then(window.location.reload())
  }

  render() {
    setTimeout(this.serverAuth, 7000)

    if (this.props.auth.loggedIn()) return <Redirect to="/polls" />

    return (
      <Container style={{ paddingTop: '60px' }} textAlign="center">
        <Loader active />
        <Segment>
          <Header textAlign="center" size="huge">
            Logging In <Divider />
          </Header>
          <p>If you aren't redirected, click <Link to="/polls">here.</Link></p>
        </Segment>
      </Container>
    )
  }
}

export default Login
