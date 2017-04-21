import React, { Component } from 'react'
import { Container, Header, Segment } from 'semantic-ui-react'

class PollPage extends Component {
  render() {
    return (
      <Container style={{ paddingTop: '60px' }}>
        <Segment>
          <Header textAlign="center" size="huge">{this.props.match.params.pollID}</Header>
        </Segment>
      </Container>
    )
  }
}

export default PollPage
