// 'use strict'

// const chai = require('chai')
// const chaiHTTP = require('chai-http')
// const server = require('../app')
// const { expect } = require('chai');
// const Map = require('../models/Map')
// const should = chai.should()
// chai.use(chaiHTTP)


// describe('>>>TESTING MAPS API<<<', () => {
//     Map.collection.drop();

//     beforeEach(async () => {
//         let map = new Map({
//             title: 'Trans Studio Mall',
//             lat: -6.9261257,
//             lng:107.6343728
//         });
//         await map.save()
//     })

//     afterEach(async () => {
//         await Map.collection.drop();

//     })

//     it('Should search data from user input when accessing /api/maps/search', async () => {
//         await chai.request(server).post('/api/maps/').send({ 'title': 'Cihampelas Walk', 'lat': -6.8965457,'lng':107.6103536 });
    
//         const searchData1 = await chai.request(server).post('/api/maps/search').send({ 'title': 'Cihampelas Walk' });
//         searchData1.should.have.status(200);
//         searchData1.should.be.a.json;
//         searchData1.body.should.be.a('array');
//         searchData1.body.length.should.equal(1);
//         searchData1.body[0].should.have.property('_id');
//         searchData1.body[0].should.have.property('title');
//         searchData1.body[0].should.have.property('lat');
//         searchData1.body[0].should.have.property('lng');
//         searchData1.body[0].title.should.equal('Cihampelas Walk');
//         searchData1.body[0].lat.should.equal(-6.8965457);
//         searchData1.body[0].lng.should.equal(107.6103536);

//     });

//     it('Should list ALL data from database /api/maps/ GET', async () => {
//         const data = await chai.request(server).get('/api/maps')

//         data.should.have.status(200);
//         data.body.should.be.a('array');
//         data.body[0].should.have.property('_id');
//         data.body[0].should.have.property('title');
//         data.body[0].should.have.property('lat');
//         data.body[0].should.have.property('lng');
//         data.body[0].title.should.equal('Trans Studio Mall');
//         data.body[0].lat.should.equal(-6.9261257);
//         data.body[0].lng.should.equal(107.6343728);
       
//     });


//     it('Should edit a specific data with targeted id  /api/maps/:id PUT', async () => {
//         const data = await chai.request(server).get('/api/maps');
//         const id = data.body[0]._id;

//         const takeEditedData = await chai.request(server).put(`/api/maps/${id}`).send({ 'title': 'Transwakwaw Mall', 'lat': -6.9161257,'lng':108.6343728 });
//         takeEditedData.should.have.status(201);
//         takeEditedData.should.be.json;
//         takeEditedData.body.should.have.property('success');
//         takeEditedData.body.should.have.property('message');
//         takeEditedData.body.should.have.property('data');
//         takeEditedData.body.data.should.have.property('_id');
//         takeEditedData.body.data.should.have.property('title');
//         takeEditedData.body.data.should.have.property('lat');
//         takeEditedData.body.data.should.have.property('lng');
//         takeEditedData.body.success.should.equal(true);
//         takeEditedData.body.message.should.equal('data have been updated');
//         takeEditedData.body.data.title.should.equal('Transwakwaw Mall');
//         takeEditedData.body.data.lat.should.equal(-6.9161257);
//         takeEditedData.body.data.lng.should.equal(108.6343728);

//     });

//     it('Should add a data into database when accessing  /api/maps/ POST', async () => {
//         const addedData = await chai.request(server).post('/api/maps/').send({ 'title': 'Indomaret Cinambo', 'lat': -5.12345,'lng':123.45678 });
       
//         addedData.should.have.status(201);
//         addedData.should.be.json;
//         addedData.body.should.have.property('success');
//         addedData.body.should.have.property('message');
//         addedData.body.should.have.property('data');
//         addedData.body.data.should.have.property('_id');
//         addedData.body.data.should.have.property('title');
//         addedData.body.data.should.have.property('lat');
//         addedData.body.data.should.have.property('lng');
//         addedData.body.success.should.equal(true);
//         addedData.body.message.should.equal('data have been added');
//         addedData.body.data.title.should.equal('Indomaret Cinambo');
//         addedData.body.data.lat.should.equal(-5.12345);
//         addedData.body.data.lng.should.equal(123.45678);
//     });

//     it('Should Delete a specific data with id from database when accessing  /api/maps/id DELETE', async () => {
//         const addedData = await chai.request(server).post('/api/maps/').send({ 'title': 'Indomaret Cinambo', 'lat': -5.12345,'lng':123.45678 });
//         const id= addedData.body.data._id
        
//         const delData= await chai.request(server).delete(`/api/maps/${id}`)
//         delData.should.have.status(200);
//         delData.should.be.json;
//         delData.body.should.have.property('success');
//         delData.body.should.have.property('message');
//         delData.body.should.have.property('data');
//         delData.body.data.should.have.property('_id');
//         delData.body.data.should.have.property('title');
//         delData.body.data.should.have.property('lat');
//         delData.body.data.should.have.property('lng');
//         delData.body.success.should.equal(true);
//         delData.body.message.should.equal('data have been deleted');
//         delData.body.data.title.should.equal('Indomaret Cinambo');
//         delData.body.data.lat.should.equal(-5.12345);
//         delData.body.data.lng.should.equal(123.45678);
//     });

//     it('Should find a specific data with id from database when accessing  /api/maps/id GET', async () => {
//         const data = await chai.request(server).get('/api/maps');
//         const id = data.body[0]._id;
             
//         const getData= await chai.request(server).get(`/api/maps/${id}`)
//         getData.should.have.status(200);
//         getData.should.be.json;
//         getData.body.should.have.property('success');
//         getData.body.should.have.property('message');
//         getData.body.should.have.property('data');
//         getData.body.data.should.have.property('_id');
//         getData.body.data.should.have.property('title');
//         getData.body.data.should.have.property('lat');
//         getData.body.data.should.have.property('lng');
//         getData.body.success.should.equal(true);
//         getData.body.message.should.equal('data found');
//         getData.body.data.title.should.equal('Trans Studio Mall');
//         getData.body.data.lat.should.equal(-6.9261257);
//         getData.body.data.lng.should.equal(107.6343728);
//     });

// })