import React from 'react'
import { Segment, Loader } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const PollList = (props) => (
  <Segment.Group piled >
    <Loader {...props.poll === [] ? {active: true} : {active: false}} />
    {
      props.polls.map((poll, i) => (
        <Segment key={i} textAlign="center">
          <Link to={`/polls/${poll.pollID}`}>{poll.title}</Link>
        </Segment>
      ))
    }
  </Segment.Group>
)

export default PollList
