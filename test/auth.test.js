'use strict'

const chai = require('chai')
const chaiHTTP = require('chai-http')
const server = require('../app')
const { expect } = require('chai');
const User = require('../models/User')
const should = chai.should()
chai.use(chaiHTTP)

describe('users', function () {
  User.collection.drop();

  beforeEach(function (done) {
    let user = new User({
      email: 'abdlazis530@gmail.com',
      password: 'kucinganggoralapar',
      token: "",
    });
    user.save(function (err) {
      done();
    })
  })

  afterEach(function (done) {
    User.collection.drop();
    done()
  })

  it('should list ALL users on /api/users/list GET', function (done) {
    chai.request(server)
      .get('/api/users/list')
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('email');
        res.body[0].should.have.property('password');
        res.body[0].should.have.property('token');
        res.body[0].email.should.equal('abdlazis530@gmail.com');
        done();
      });
  });

  it('should add a SINGLE user on /api/users/register POST', function (done) {
    chai.request(server)
      .post('/api/users/register')
      .send({ 'email': 'ladybug@gmail.com', 'password': '12345', 'retypepassword': '12345' })
      .end(function (err, res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.should.have.property('token');
        res.body.should.have.property('message');
        expect(res.body.token).to.exist;
        res.body.data.email.should.equal('ladybug@gmail.com');
        res.body.message.should.equal('register success');
        done();
      });
  });

  it('should LOGIN into /api/users/login POST', function (done) {
    chai.request(server)
      .post('/api/users/login')
      .send({ 'email': 'abdlazis530@gmail.com', 'password': 'kucinganggoralapar' })
      .end(function (err, res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.should.have.property('token');
        res.body.should.have.property('message');
        expect(res.body.token).to.exist;
        res.body.data.email.should.equal('abdlazis530@gmail.com');
        res.body.message.should.equal('login success');
        done();
      });
  });


  it('should Check token user when access /api/users/check POST', function (done) {
    chai
    .request(server)
    .post("/api/users/login")
    .send({
      email: "abdlazis530@gmail.com",
      password: "kucinganggoralapar"
    })
    .end((err, response) => {
      const token = response.body.token;
      console.log('REQ BODY:',response.body)
      console.log('TOKEN TES:',token)
      chai
        .request(server)
        .post("/api/users/check")
        .set( "Authorization",token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("valid");
          res.body.valid.should.equal(true);
          done();
        });
    });
  });

  it('should logout when access /api/users/destroy GET', function (done) {
    chai
    .request(server)
    .post("/api/users/login")
    .send({
      email: "abdlazis530@gmail.com",
      password: "kucinganggoralapar"
    })
    .end((err, response) => {
      const token = response.body.token;
      console.log('REQ BODY:',response.body)
      console.log('TOKEN TES:',token)
      chai
        .request(server)
        .get("/api/users/destroy")
        .set( "Authorization",token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("logout");
          res.body.logout.should.equal(true);
          done();
        });
    });
  });

})
