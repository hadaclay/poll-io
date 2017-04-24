import React, { Component } from 'react'
import { Header, Form, Grid } from 'semantic-ui-react'

class Poll extends Component {
  state = {}
  
  handleChange = (e, { value }) => this.setState({ value })
  
  render() {
    const { value } = this.state
    return (
      <Grid columns={2}>
        <Grid.Column width={5}>
          <Header>{this.props.poll.title}</Header>
          <Form>
            {this.props.poll.options.map((option, i) => 
              <Form.Radio label={option} value={String(i)}
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