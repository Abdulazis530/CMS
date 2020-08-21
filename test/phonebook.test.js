'use strict'

const chai = require('chai')
const chaiHTTP = require('chai-http')

const server = require('../app')
const Phonebook = require('../models/phonebook')

const should = chai.should()
chai.use(chaiHTTP)

describe('phonebooks', function () {
  Phonebook.collection.drop();

  beforeEach(function (done) {
    let phonebook = new Phonebook({
      name: 'test',
      phone: '0821223000'
    });
    phonebook.save(function (err) {
      done();
    })
  })

  afterEach(function (done) {
    Phonebook.collection.drop();
    done()
  })

  it('Should list ALL phonebooks on /api/phonebooks GET', function (done) {
    chai.request(server)
      .get('/api/phonebooks')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('phone');
        res.body[0].name.should.equal('test');
        res.body[0].phone.should.equal('0821223000');
        done();
      })
  })

  it('should add a SINGLE phonebook on /api/phonebooks POST', function (done) {
    chai.request(server)
      .post('/api/phonebooks')
      .send({ 'name': 'Superman', 'phone': '007' })
      .end(function (err, res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('phone');
        res.body.should.have.property('_id');
        res.body.name.should.equal('Superman');
        res.body.phone.should.equal('007');
        done();
      })
  })


  it('should update a SINGLE phonebook on /api/phonebooks/<id> PUT', function (done) {
    chai.request(server)
      .get('/api/phonebooks')
      .end(function (err, res) {
        chai.request(server)
          .put(`/api/phonebooks/${res.body[0]._id}`)
          .send({ name: 'Batman', phone: '0812382813' })
          .end(function (err, response) {
            response.should.have.status(201);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.be.a('object');
            response.body.should.have.property('name');
            response.body.should.have.property('phone');
            response.body.should.have.property('_id');
            response.body.name.should.equal('Batman');
            response.body.phone.should.equal('0812382813');
            done();
          })
      })
  })

  it('should delete a SINGLE phonebook on /api/phonebooks/<id> DELETE', function(done){
    chai.request(server)
    .get('/api/phonebooks')
    .end(function(err, res){
      chai.request(server)
      .delete(`/api/phonebooks/${res.body[0]._id}`)
      .end(function(err, response){
        response.should.have.status(201)
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.be.a('object');
        response.body.should.have.property('name');
        response.body.should.have.property('_id');
        response.body.name.should.equal('test');
        done();
      })
    })
  })

})
