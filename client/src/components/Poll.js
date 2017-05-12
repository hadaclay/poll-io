import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2'
import { Header, Form, Grid, Button, Icon, Loader, Confirm } from 'semantic-ui-react'

class Poll extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      options: [],
      validPoll: true,
      loading: true,
      deleteModalOpen: false,
      canDelete: true,
      isCustomOption: false,
      customOption: '',
      alreadyVoted: false,
      isAuthed: false
    }

    // Colors ripped from d3.schemeSet3
    this.colorScale = [
      '#8dd3c7',
      '#ffffb3',
      '#bebada',
      '#fb8072',
      '#80b1d3',
      '#fdb462',
      '#b3de69',
      '#fccde5',
      '#d9d9d9',
      '#bc80bd',
      '#ccebc5',
      '#ffed6f'
    ]
  }

  showDeleteModal = () => this.setState({ deleteModalOpen: true })

  handleChange = (e, { value }) => this.setState({ value })

  handleDelete = () => {
    let userID = JSON.parse(localStorage.getItem('profile')).user_id
    fetch(`/api/polls/${this.props.pollID}`, {
      headers: {
        userid: userID
      },
      method: 'DELETE'
    }).then(() => {
      this.props.history.replace('/polls')
    })
  }

  handleCustomOption = e => {
    this.setState({
      isCustomOption: true,
      customOption: e.target.value,
      value: String(this.state.options.length)
    })
    if (e.target.value === '') {
      this.setState({ isCustomOption: false, customOption: e.target.value })
    }
  }

  handleVote = e => {
    e.preventDefault()

    if (!this.state.value) {
      alert('Please choose an option.')
      return
    }

    if (this.state.alreadyVoted) {
      alert("You've already voted on this poll.")
      return
    }

    let userID = JSON.parse(localStorage.getItem('profile')) || null
    if (userID !== null) userID = userID.user_id

    fetch(`/api/vote/${this.props.pollID}`, {
      headers: {
        userid: userID,
        option: this.state.value,
        is_custom_option: this.state.isCustomOption,
        custom_option_text: this.state.customOption
      }
    })
      .then(res => res.text())
      .then(res => {
        if (res === "You've already voted on this poll.") {
          alert(res)
        } else return window.location.reload()
      })
  }

  componentDidMount() {
    let isAuthed = false
    let userID = JSON.parse(localStorage.getItem('profile'))
    if (userID !== null) {
      userID = userID.user_id
      isAuthed = true
    }

    fetch(`/api/polls/${this.props.pollID}`, {
      headers: {
        userid: userID
      }
    })
      .then(res => res.json())
      .then(poll => {
        this.setState({
          title: poll.title,
          options: poll.options,
          canDelete: poll.canDelete,
          isAuthed: isAuthed,
          alreadyVoted: poll.alreadyVoted,
          loading: false,
          validPoll: poll.validPoll,
          value: String(poll.votedOption) || ''
        })
      })
  }

  render() {
    const { value } = this.state

    const chartData = {
      labels: this.state.options.map(option => option.option),
      datasets: [
        {
          data: this.state.options.map(option => option.votes),
          backgroundColor: this.colorScale
        }
      ]
    }

    const deleteButton = (
      <Button fluid negative onClick={this.showDeleteModal}>
        Delete Poll
      </Button>
    )

    const tweetButton = (
      <a
        href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=Vote For ${this.state.title} on Poll.io`}
      >
        <Button fluid color="twitter" size="medium">
          <Icon name="twitter" />Share on Twitter
        </Button>
      </a>
    )

    if (!this.state.validPoll) {
      return <Header as="h1" textAlign="center">Poll Not Found</Header>
    }

    return (
      <Grid columns={2}>
        <Loader active={this.state.loading} />
        <Grid.Column width={5}>
          <Header textAlign="center">{this.state.title}</Header>
          <Form onSubmit={this.handleVote}>

            {this.state.options.map((option, i) => (
              <Form.Radio
                label={option.option}
                value={String(i)}
                checked={value === String(i)}
                onChange={this.handleChange}
                key={i}
              />
            ))}

            {/* If user is authed, show custom option input */}
            {this.state.isAuthed
              ? <Form.Input onChange={this.handleCustomOption} placeholder="Custom Option" />
              : ''}
            <Form.Button primary fluid size="medium">Submit</Form.Button>
          </Form><br />
          {tweetButton}
        </Grid.Column>

        <Grid.Column width={11}>
          <Pie data={chartData} /><br />
          {this.state.canDelete ? deleteButton : ''}
          <Confirm
            open={this.state.deleteModalOpen}
            content="Would you like to delete this poll?"
            onCancel={() => this.setState({ deleteModalOpen: false })}
            onConfirm={this.handleDelete}
          />
        </Grid.Column>
      </Grid>
    )
  }
}

export default Poll
