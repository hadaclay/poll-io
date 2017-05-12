import { Poll } from '../models'

// Get Authed User's Polls
const GetUserPolls = (req, res) => {
  const userID = req.headers.userid
  Poll.find({ author: userID }).exec((err, result) => {
    if (err) throw err

    res.json(result)
  })
}

export default GetUserPolls
