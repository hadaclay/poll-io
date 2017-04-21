import React, { Component } from 'react'
import { Container, Segment, Header } from 'semantic-ui-react'

class MyPolls extends Component {
  render() {
    return (
      <Container style={{ paddingTop: '60px' }} textAlign="center">
        <Segment>
          <Header textAlign="center" size="huge">My Polls</Header>
          Below are the polls you own:
        </Segment>
      </Container>
    )
  }
}

export default MyPolls
