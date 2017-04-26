import React, { Component } from 'react'
import { Container, Segment } from 'semantic-ui-react'

import Poll from '../components/Poll'

class PollPage extends Component {
  constructor(props) {
    super(props)

    this.ID = this.props.match.params.pollID
  }

  render() {
    return (
      <Container style={{ paddingTop: '60px' }}>
        <Segment padded="very">
          <Poll pollID={this.ID} />
        </Segment>
      </Container>
    )
  }
}

export default PollPage
