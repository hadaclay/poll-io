import express from 'express'
import path from 'path'

const app = express()

app.set('port', 3000)

app.use(express.static('client/build'))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

app.listen(app.get('port'))
