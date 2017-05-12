import { Poll } from '../models'

// Main Poll Page, shows most recent user-created polls
const GetRecentPolls = (req, res) => {
  Poll.find({}).limit(50).exec((err, result) => {
    if (err) throw err
    res.json(result)
  })
}

export default GetRecentPolls
