import { Poll, User } from '../models'

// Authed/Unauthed Poll Page
const GetPoll = (req, res) => {
  let canDelete = false
  let alreadyVoted = false
  let votedOption = ''

  if (req.headers.userid !== 'null') {
    User.findOne({ userID: req.headers.userid }).exec((err, result) => {
      if (err) throw err
      if (result === null) return

      // Check if user created :pollID
      const pollList = result.polls
      canDelete = pollList.includes(req.params.pollID)

      // Check if user already voted
      const votes = result.votes.find(vote => vote.pollID === req.params.pollID)
      if (votes !== undefined) {
        alreadyVoted = true
        votedOption = votes.option
      }
    })
  }

  Poll.findOne({ pollID: req.params.pollID }).exec((err, result) => {
    if (err) throw err
    if (result === null) {
      return res.json({
        title: 'Poll Not Found',
        validPoll: false,
        options: []
      })
    }

    const outputPoll = Object.assign(
      {
        canDelete,
        alreadyVoted,
        votedOption,
        validPoll: true
      },
      result._doc
    )

    return res.json(outputPoll)
  })
}

export default GetPoll
