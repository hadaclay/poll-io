import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Segment, Header } from 'semantic-ui-react'

import PollList from '../components/PollList'

class Polls extends Component {
  constructor(props) {
    super(props)

    this.state = {
      polls: [],
      loading: true
    }
  }

  componentWillMount() {
    fetch('/api/polls').then(res => res.json()).then((polls) => {
      this.setState({ polls: polls.reverse(), loading: false })
    })
  }

  render() {
    return (
      <Container style={{ paddingTop: '60px' }}>
        <Segment loading={this.state.loading}>
          <Header textAlign="center" size="huge">Poll.io</Header>
          <PollList route={this.props.match} polls={this.state.polls} />
        </Segment>
      </Container>
    )
  }
}

Polls.propTypes = {
  match: PropTypes.object.isRequired
}

export default Polls
