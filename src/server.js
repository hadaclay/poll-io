import express from 'express'
import path from 'path'
import mongoose from 'mongoose'

import apiRouter from './routes'

const app = express()

// Make Mongoose use ES6 promises
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_URI)

app.set('port', process.env.PORT || 3000)
app.set('trust proxy', true)

app.use(express.static(path.resolve('client', 'build')))
app.use('/', apiRouter)

app.get('*', (req, res) => {
  res.sendFile(path.resolve('client', 'build', 'index.html'))
})

app.listen(app.get('port'))
