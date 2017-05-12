import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
          <Poll pollID={this.ID} history={this.props.history} />
        </Segment>
      </Container>
    )
  }
}

PollPage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default PollPage
