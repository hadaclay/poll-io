import { Poll, User } from '../models'

const DeletePoll = (req, res) => {
  const id = req.params.pollID

  if (req.headers.userid !== null) {
    User.findOne({ userID: req.headers.userid }).exec((err, result) => {
      if (err) throw err

      if (result.polls.includes(id)) {
        result.polls.splice(result.polls.indexOf(id), 1)

        result.save((err) => {
          if (err) throw err
        })

        Poll.remove({ pollID: id }, (err) => {
          if (err) throw err
          return res.sendStatus(200)
        })
      }
    })
  } else return res.sendStatus(401)
}

export default DeletePoll
