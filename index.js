const express = require('express')
const parser = require('body-parser')
const mongoose = require('./db/schema.js')
const Item = mongoose.model('Item')
const cors = require('cors')

const app = express()

app.set('port', process.env.PORT || 3001)
app.use(parser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.redirect('/api/items')
})

app.get('/api/items', (req, res) => {
  Item.find({})
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

// app.put('/api/items/:id', (req, res) => {
//   Item.findById(req.params._id, function (err, item) {
//     if (err)
//       {res.send(err);}
//       item.status = 'complete'  // update the status 
//     // save the item
//     item.save(function (err) {
//       if (err)
//         {res.send(err);}
//       res.json(item)
//     })
//   })
// })

  
//   )
//     .then((item) => {
//       res.json(item)
//     })
// })

app.delete('/api/items/:id', (req, res) => {
  Item.findByIdAndRemove(req.params.id)
    .then(item => {
      if (!item) {
        return res.status(404).send({
          message: 'Item not found with id ' + req.params.id
        })
      }
      res.send({message: 'Item deleted successfully!'})
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Note not found with id ' + req.params.id
        })
      }
      return res.status(500).send({
        message: 'Could not delete note with id ' + req.params.id
      })
    })
})

app.listen(app.get('port'), () => {
  console.log('Server listening on port ' + app.get('port'))
})
