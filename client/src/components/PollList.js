import React from 'react'
import PropTypes from 'prop-types'
import { Segment, Loader } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const PollList = props => (
  <Segment.Group piled>
    <Loader active={props.loading} />
    {props.polls.map((poll, i) => (
      <Segment key={i} textAlign="center">
        <Link to={`/polls/${poll.pollID}`}>{poll.title}</Link>
      </Segment>
    ))}
  </Segment.Group>
)

PollList.propTypes = {
  loading: PropTypes.bool,
  polls: PropTypes.array.isRequired
}

PollList.defaultProps = {
  loading: false
}

export default PollList
