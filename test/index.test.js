const should = require('chai').should()
const expect = require('chai').expect
const supertest = require('supertest')
// const api = supertest('https://mern-to-do-api.herokuapp.com')
const api = supertest('http://localhost:3001')

describe('GET /api/items', function () {
  it('should return a 200 response', function (done) {
    api
      .get('/api/items')
      .set('Accept', 'application/json')
      .expect(200, done)
  })

  it('should return an array', function (done) {
    api
      .get('/api/items')
      .set('Accept', 'application/json')
      .end(function (error, response) {
        expect(response.body).to.be.an('array')
        done()
      })
  })

  it("should return an array of objects that have a field called 'task' ", function (done) {
    api
      .get('/api/items')
      .set('Accept', 'application/json')
      .end(function (error, response) {
        expect(response.body[0]).to.have.property('task')
        done()
      })
  })
})

describe('POST /api/items', () => {
  let previousLength
  before((done) => {
    api.get('/api/items')
      .set('Accept', 'application/json')
      .end((error, response) => {
        previousLength = response.body.length
        done()
      })
  })
  before((done) => {
    api.post('/api/items')
      .set('Accept', 'application/json')
      .send({
        'id': previousLength + 1,
        'task': 'Buy groceries',
        'status': 'incomplete'
      })
      .end(done)
  })
  it('should add a task to the items collection and return it', (done) => {
    api.get('/api/items')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response.body.length).to.equal(previousLength + 1)
        done()
      })
  })
})

describe('GET /api/items/:id', () => {
  let id
  before(done => {
    api.get('/api/items')
      .set('Accept', 'application/json')
      .end((error, response) => {
        id = response.body[0]._id
        done()
      })
  })
  it('retrieves an item by it\'s id with the correct fields', done => {
    api.get(`/api/items/${id}`)
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response.body._id).to.equal(id)
        expect(response.body.task).to.be.a('string')
        expect(response.body.status).to.be.a('string')
        done()
      })
  })
})

describe('DELETE /api/items/:id',  () => {

    let previousLength
    let idToDelete
  
    before( done => {
      api
        .get('/api/items')       
        .set('Accept', 'application/json')       
        .end( (error, response) =>  {
          previousLength = response.body.length       
          idToDelete = response.body[0]._id       
          done()       
        })
    })
  
    before(done => {
      api.delete(`/api/items/${idToDelete}`)
         .set('Accept', 'application/json')
         .end( (error, response) => {
           done()
         })
    })
  
    it('deletes a candy by id',  done => {
      api.get('/api/items')
         .set('Accept', 'application/json')
         .end( (error, response) => {
           expect(response.body.length).to.equal(previousLength - 1)
           expect(response.body.find((item) => item._id == idToDelete)).to.equal(undefined)
           done()
         })
    })
  })
  
  describe('PUT /api/items/:id',  () => {
    let itemToUpdate
    let status
    before( done => {
      api.get('/api/items')
         .set('Accept', 'application/json')
         .end( (error, response) => {
           itemToUpdate = response.body[0]
           status = response.body[0].status
           done()
         })
    })
    before( done => {
      api .put(`/api/items/${itemToUpdate._id}`)
        .set('Accept', 'application/json')
        // .send({
        //   '_id': itemToUpdate._id,
        //   'task': itemToUpdate.task,
        //   'status': 'complete'
        // })
        .end( (error, response) => {
          done()
        })
    })
    it('can update a task by id',  done => {
      api
        .get(`/api/items/${itemToUpdate._id}`)       
        .set('Accept', 'application/json')       
        .end( (error, response) => {       
          if (status ==='incomplete') {
            expect(response.body.status).to.equal('complete')
          } else {
            expect(response.body.status).to.equal('incomplete')
          }

          done()       
        })
  })
  })