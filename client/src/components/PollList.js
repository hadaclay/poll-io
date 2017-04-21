import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class PollList extends Component {
  render() {
    const renderedPolls = this.props.polls.map((poll, i) =>
      (
        <Segment key={i} textAlign="center">
          <Link to={`/poll/${poll.id}`}>{poll.title}</Link>
        </Segment>
      )
    )

    return <Segment.Group piled>{renderedPolls}</Segment.Group>
  }
}

export default PollList
