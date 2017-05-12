import { Poll, User } from '../models'

// Authed/Unauthed Vote Route
const Vote = (req, res) => {
  // If voter not signed in, use IP, otherise use Auth0 userID
  let voter = ''
  let ipVote = false
  if (req.headers.userid === 'null') {
    voter = req.ip
    ipVote = true
  } else {
    voter = req.headers.userid
  }

  Poll.findOne({ pollID: req.params.pollID }).exec((err, result) => {
    if (err) throw err

    if (ipVote && result.voters.indexOf(voter) !== -1) {
      return res.send("You've already voted on this poll.")
    }

    result.voters.push(voter)

    if (req.headers.is_custom_option === 'true') {
      result.options.push({ option: req.headers.custom_option_text, votes: 1 })
    } else {
      result.options[parseInt(req.headers.option, 10)].votes += 1
    }

    result.save((err) => {
      if (err) throw err
      if (ipVote) return res.send('Vote Successful')
    })
  })

  if (!ipVote) {
    User.findOne({ userID: voter }).exec((err, result) => {
      if (err) throw err

      result.votes.push({
        pollID: req.params.pollID,
        option: parseInt(req.headers.option, 10)
      })

      result.save((err) => {
        if (err) throw err

        return res.send('Vote Successful')
      })
    })
  }
}

export default Vote
