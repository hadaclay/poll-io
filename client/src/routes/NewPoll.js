import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Segment, Header, Form } from 'semantic-ui-react'

class NewPoll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      titleValue: '',
      optionsValue: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.submitNewPoll = this.submitNewPoll.bind(this)
  }

  handleChange(event) {
    if (event.target.tagName === 'INPUT') {
      this.setState({ titleValue: event.target.value })
    } else this.setState({ optionsValue: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.submitNewPoll()
  }

  submitNewPoll() {
    if (this.state.optionsValue.split('\n').length < 2) {
      alert('Not enough options. Polls must have two or more.')
      return
    } else if (
      this.state.optionsValue.split('\n').includes(' ') ||
      this.state.optionsValue.split('\n').includes('')
    ) {
      alert('Blank options are not allowed.')
      return
    } else if (
      this.state.titleValue.length <= 0 ||
      /[a-z]/i.test(this.state.titleValue) === false
    ) {
      alert('Invalid poll title.')
      return
    }

    const formData = new FormData()

    formData.append('title', this.state.titleValue)
    formData.append('options', this.state.optionsValue)
    fetch('/api/newpoll', {
      headers: {
        authorization: `Bearer ${localStorage.getItem('id_token')}`,
        userid: JSON.parse(localStorage.getItem('profile')).user_id
      },
      method: 'POST',
      body: formData
    })
      .then(res => res.text())
      .then(res => this.props.history.replace(res))
  }

  render() {
    return (
      <Container style={{ paddingTop: '60px' }}>
        <Segment>
          <Header textAlign="center" size="huge">Create New Poll</Header>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              label="Title"
              placeholder="Title of Poll"
              value={this.state.titleValue}
              onChange={this.handleChange}
            />
            <Form.TextArea
              label="Options"
              placeholder="One Option Per Line"
              value={this.state.optionsValue}
              onChange={this.handleChange}
            />
            <Form.Button type="submit" primary>Create Poll</Form.Button>
          </Form>
        </Segment>
      </Container>
    )
  }
}

NewPoll.propTypes = {
  history: PropTypes.object.isRequired
}

export default NewPoll
