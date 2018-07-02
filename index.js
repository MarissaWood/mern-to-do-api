const express = require('express')
const parser = require('body-parser')
const mongoose = require('./db/schema.js')
const Item = mongoose.model('Item')

const app = express()

app.set('port', process.env.PORT || 3001)
app.use(parser.json())

app.get('/', (req, res) => {
  res.redirect('/api/items')
})

app.get('/api/items', (req, res) => {
  Item.find()
    .then((items) => {
      res.json(items)
    })
    .catch((err) => {
      console.log(err)
    })
})

app.post('/api/items', (req, res) => {
  Item.create(req.body)
    .then((item) => {
      res.json(item)
    })
    .catch((err) => {
      console.log(err)
    })
})

app.get('/api/items/:id', (req, res) => {
  Item.findById(req.params.id)
    .then((item) => {
      res.json(item)
    })
    .catch((err) => {
      console.log(err)
    })
})

app.listen(app.get('port'), () => {
  console.log('Server listening on port ' + app.get('port'))
})
