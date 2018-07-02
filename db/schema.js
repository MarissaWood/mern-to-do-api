const mongoose = require('./connection.js')

const Item = new mongoose.Schema({
  task: String,
  status: String
})

mongoose.model('Item', Item)

module.exports = mongoose
