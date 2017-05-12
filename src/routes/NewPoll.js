import { Poll, User } from '../models'

// Poll Creation
const NewPoll = (req, res) => {
  const auth = req.headers.authorization
  const ID = req.headers.userid

  if (auth === undefined || ID === undefined) {
    res.sendStatus(401)
    return
  }

  let oldPolls = []
  const title = req.body.title
  let options = req.body.options.replace(/\r/g, '').split('\n')
  options = options.map(option => ({ option, votes: 0, voters: [] }))

  const newPoll = new Poll({
    title,
    options,
    author: ID,
    pollID: Math.random().toString(36).substr(2, 5)
  })

  User.findOne({ userID: ID }, (err, result) => {
    if (err) throw err
    oldPolls = result.polls

    User.findOneAndUpdate(
      { userID: ID },
      { polls: [...oldPolls, newPoll.pollID] },
      (err, result) => {
        if (err) throw err

        newPoll.save((err) => {
          if (err) throw err
        })
        res.send(`/polls/${newPoll.pollID}`)
      }
    )
  })
}

export default NewPoll
