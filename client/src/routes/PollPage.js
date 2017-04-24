import React, { Component } from 'react'
import { Container, Segment } from 'semantic-ui-react'

import Poll from '../components/Poll'
import MOCK_DATA from '../mock_data'

class PollPage extends Component {
  constructor(props) {
    super(props)

    this.getPollFromID = this.getPollFromID.bind(this)
    this.ID = this.props.match.params.pollID
  }

  getPollFromID(id) {
    return MOCK_DATA.filter((poll) => poll.id === id)
  }

  render() {
    return (
      <Container style={{ paddingTop: '60px' }}>
        <Segment padded="very">
          <Poll poll={this.getPollFromID(this.ID)[0]} />
        </Segment>
      </Container>
    )
  }
}

export default PollPage
