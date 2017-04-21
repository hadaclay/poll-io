import React, { Component } from 'react'
import { Container, Segment, Header, Form } from 'semantic-ui-react'

class NewPoll extends Component {
  render() {
    return (
      <Container style={{ paddingTop: '60px' }}>
        <Segment>
          <Header textAlign="center" size="huge">Create New Poll</Header>
          <Form>
            <Form.Input label="Name" />
            <Form.TextArea label="Options" placeholder="One Per Line" />
          </Form>
        </Segment>
      </Container>
    )
  }
}

export default NewPoll
