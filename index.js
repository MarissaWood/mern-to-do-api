const express = require('express')
// const parser = require('body-parser')
// const mongoose = require('./db/schema.js')
// const Translation = mongoose.model('Translation')

const app = express()

app.set('port', process.env.PORT || 3001)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(app.get('port'), () => {
  console.log('Server listening on port ' + app.get('port'))
})
