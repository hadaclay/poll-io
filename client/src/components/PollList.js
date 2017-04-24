import React from 'react'
import { Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const PollList = (props) => (
  <Segment.Group piled>
    {
      props.polls.map((poll, i) => (
        <Segment key={i} textAlign="center">
          <Link to={`/polls/${poll.id}`}>{poll.title}</Link>
        </Segment>
      ))
    }
  </Segment.Group>
)

export default PollList
