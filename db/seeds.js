const mongoose = require('./schema.js')
const Item = mongoose.model('Item')
const itemData = require('./list-data.json')

Item.remove({})
  .then(() => {
    Item.collection.insert(itemData)
      .then((items) => {
        console.log(items)
        process.exit()
      })
  })
  .catch((err) => {
    console.log(err)
  })
