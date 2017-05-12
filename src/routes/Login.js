import { User } from '../models'

// Login Callback Route
const Login = (req, res) => {
  const auth = req.headers.authorization
  const userID = req.headers.userid

  // Make sure there's an id_token and userID in request
  if (!auth || !userID) {
    res.sendStatus(401)
    return
  }

  User.find({ userID }).exec((err, result) => {
    if (err) throw err

    if (result.length === 0) {
      const newUser = new User({
        userID,
        polls: [],
        votes: []
      })

      newUser.save((err) => {
        if (err) throw err
        res.status(200).end()
      })
    }
  })
}

export default Login
