import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  userID: String,
  polls: Array,
  votes: [{ pollID: String, option: Number }]
})

const pollSchema = mongoose.Schema({
  title: String,
  author: String,
  options: [{ option: String, votes: Number }],
  pollID: String,
  voters: Array
})

const User = mongoose.model('Users', userSchema)
const Poll = mongoose.model('Polls', pollSchema)

export { Poll, User }
