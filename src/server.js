import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import multer from 'multer'

const app = express()
mongoose.connect('mongodb://localhost/poll-io')

const pollSchema = mongoose.Schema({
  title: String,
  author: String,
  options: [ { option: String, votes: Number, voters: Array } ],
  pollID: String
})

const Poll = mongoose.model('Polls', pollSchema)

app.set('port', 3000)
app.use(express.static('client/build'))

app.get('/api/polls', (req, res) => {
  Poll.find({}).exec((err, result) => {
      if (err) console.error(err)
      res.json(result)
    })
})

app.post('/api/newpoll', multer().array(), (req, res) => {
  const title = req.body.title
  let options = req.body.options.split('\n')
  options = options.map(option => {
    return {option, votes: 0, voters: []}
  })
  const newPoll = new Poll({
    title,
    options,
    author: 'TEST',
    pollID: Math.random().toString(36).substr(2, 5)
  })
  newPoll.save(err => {if (err) throw err})
  res.send(`Success! New Poll at https://fcc-dev-hadaclay.c9users.io/polls/${newPoll.pollID}`)
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

app.listen(app.get('port'))
