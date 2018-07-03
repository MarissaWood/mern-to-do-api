const mongoose = require('./connection.js')
const Schema = mongoose.Schema

const Item = new Schema({
  task: String,
  status: String
})

module.exports = mongoose.model('Item', Item)
