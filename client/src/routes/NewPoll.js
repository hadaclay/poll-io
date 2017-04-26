import React, { Component } from 'react'
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
      this.setState({titleValue: event.target.value})
    }
    else this.setState({optionsValue: event.target.value})
  }
  
  handleSubmit(event) {
    event.preventDefault()
    this.submitNewPoll()
  }
  
  submitNewPoll() {
    const formData = new FormData()
    formData.append('title', this.state.titleValue)
    formData.append('options', this.state.optionsValue)
    fetch('/api/newpoll', {
      method: 'POST',
      body: formData,
    }).then(res => res.text())
      .then(res => alert(res))
  }
  
  render() {
    return (
      <Container style={{ paddingTop: '60px' }}>
        <Segment>
          <Header textAlign="center" size="huge">Create New Poll</Header>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input label="Title" placeholder="Title of Poll"
              value={this.state.titleValue} onChange={this.handleChange} />
            <Form.TextArea label="Options" placeholder="One Option Per Line"
              value={this.state.optionsValue} onChange={this.handleChange} />
            <Form.Button type="submit" primary>Create Poll</Form.Button>
          </Form>
        </Segment>
      </Container>
    )
  }
}

export default NewPoll
