import React, { Component } from 'react'
import { Header, Form, Grid } from 'semantic-ui-react'

class Poll extends Component {
  state = {
    polls: [],
    title: '',
    options: []
  }
  
  handleChange = (e, { value }) => this.setState({ value })
  
  componentDidMount() {
    // eslint-disable-next-line
    fetch('/api/polls')
      .then(res => res.json())
      .then(polls => {
        const currentPoll = polls.filter(poll => poll.pollID === this.props.pollID)[0]
        const title = currentPoll.title
        const options = currentPoll.options
        this.setState({polls, title, options})
      })
  }
  
  render() {
    const { value } = this.state
    return (
      <Grid columns={2}>
        <Grid.Column width={5}>
          <Header>{this.state.title}</Header>
          <Form>
            {this.state.options.map((option, i) => 
              <Form.Radio label={option.option} value={String(i)}
                checked={value === String(i)} onChange={this.handleChange} key={i} />
            )}
          <Form.Button primary fluid size="medium">Submit</Form.Button>
          <Form.Button fluid color="blue" size="medium">Share on Twitter</Form.Button>
         </Form>
        </Grid.Column>
        <Grid.Column width={11}>
          Graph Goes Here
        </Grid.Column>
      </Grid>
    )
  }
}

export default Poll