import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Segment, Header } from 'semantic-ui-react'
import PollList from '../components/PollList'

class UserPolls extends Component {
  constructor(props) {
    super(props)

    this.state = {
      polls: [],
      loading: true
    }
  }

  componentWillMount() {
    fetch('/api/mypolls', {
      headers: {
        userid: JSON.parse(localStorage.getItem('profile')).user_id
      }
    })
      .then(res => res.json())
      .then(polls => this.setState({ polls, loading: false }))
  }

  render() {
    return (
      <Container style={{ paddingTop: '60px' }} textAlign="center">
        <Segment loading={this.state.loading}>
          <Header textAlign="center" size="huge">My Polls</Header>
          Below are the polls you own:
          <PollList route={this.props.match} polls={this.state.polls.reverse()} />
        </Segment>
      </Container>
    )
  }
}

UserPolls.propTypes = {
  match: PropTypes.object.isRequired
}

export default UserPolls
