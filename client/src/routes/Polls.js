import React, { Component } from 'react'
import { Container, Segment, Header } from 'semantic-ui-react'

import PollList from '../components/PollList'
//import MOCK_POLLS from '../mock_data'

class Polls extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      polls: []
    }
  }
  
  componentWillMount() {
    // eslint-disable-next-line
    fetch('/api/polls') 
      .then(res => res.json())
      .then(polls => this.setState({ polls }))
  }

  render() {
    return (
      <Container style={{ paddingTop: '60px' }}>
        <Segment>
          <Header textAlign="center" size="huge">Poll.io</Header>
          <PollList route={this.props.match} polls={this.state.polls} />
        </Segment>
      </Container>
    )
  }
}

export default Polls
