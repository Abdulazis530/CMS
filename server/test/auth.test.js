'use strict'

const chai = require('chai')
const chaiHTTP = require('chai-http')
const server = require('../app')
const { expect } = require('chai');
const User = require('../models/User')
const should = chai.should()
chai.use(chaiHTTP)

describe('>>>TESTING AUTHENTICATION AND AUTHORIZATION OF AUTH.USERS API<<<', () => {
  User.collection.drop();

  beforeEach(async () => {
    let user = new User({
      email: 'abdlazis530@gmail.com',
      password: 'kucinganggoralapar',
      token: "",
    });
    await user.save();
  })

  afterEach(async () => {
    await User.collection.drop();

  })

  it('should list ALL users on /api/users/list GET', async () => {
    const data = await chai.request(server).get('/api/users/list');
    data.should.have.status(200);
    data.body.should.be.a('array');
    data.body[0].should.have.property('_id');
    data.body[0].should.have.property('email');
    data.body[0].should.have.property('password');
    data.body[0].should.have.property('token');
    data.body[0].email.should.equal('abdlazis530@gmail.com');

  });

  it('should add a SINGLE user on /api/users/register POST', async () => {
    const data = await chai.request(server)
      .post('/api/users/register')
      .send({ 'email': 'ladybug@gmail.com', 'password': '12345', 'retypepassword': '12345' });

    data.should.have.status(201);
    data.should.be.json;
    data.body.should.be.a('object');
    data.body.should.have.property('data');
    data.body.should.have.property('token');
    data.body.should.have.property('message');
    expect(data.body.token).to.exist;
    data.body.data.email.should.equal('ladybug@gmail.com');
    data.body.message.should.equal('register success');

  });

  it('should LOGIN into /api/users/login POST', async () => {
    const data = await chai.request(server)
      .post('/api/users/login')
      .send({
        'email': 'abdlazis530@gmail.com',
        'password': 'kucinganggoralapar'
      });

    data.should.have.status(201);
    data.should.be.json;
    data.body.should.be.a('object');
    data.body.should.have.property('data');
    data.body.should.have.property('token');
    data.body.should.have.property('message');
    expect(data.body.token).to.exist;
    data.body.data.email.should.equal('abdlazis530@gmail.com');
    data.body.message.should.equal('login success');

  });

  it('should Check token user when access /api/users/check POST', async () => {
    const dataLogin = await chai
      .request(server)
      .post("/api/users/login")
      .send({
        'email': "abdlazis530@gmail.com",
        'password': "kucinganggoralapar"
      })
    const token = dataLogin.body.token;

    const dataCheck = await chai
      .request(server)
      .post("/api/users/check")
      .set("Authorization", token)

    dataCheck.should.have.status(200);
    dataCheck.should.be.json;
    dataCheck.body.should.be.a("object");
    dataCheck.body.should.have.property("valid");
    dataCheck.body.valid.should.equal(true);
  });

  it('should logout when access /api/users/destroy GET', async () => {
    const dataLogin = await chai
      .request(server)
      .post("/api/users/login")
      .send({
        email: "abdlazis530@gmail.com",
        password: "kucinganggoralapar"
      })

    const token = dataLogin.body.token;
    const dataLogout = await chai
      .request(server)
      .get("/api/users/destroy")
      .set("Authorization", token)
    dataLogout.should.have.status(200);
    dataLogout.should.be.json;
    dataLogout.body.should.be.a("object");
    dataLogout.body.should.have.property("logout");
    dataLogout.body.logout.should.equal(true);

  });

})
