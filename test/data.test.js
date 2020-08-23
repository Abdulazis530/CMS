'use strict'

const chai = require('chai')
const chaiHTTP = require('chai-http')
const server = require('../app')
const { expect } = require('chai');
const Data = require('../models/Data')
const should = chai.should()
chai.use(chaiHTTP)


describe('data', () => {
    Data.collection.drop();

    beforeEach(async () => {
        let data = new Data({
            letter: 'A',
            frequency: 1.2,
        });
        await data.save()
    })

    afterEach(async () => {
        await Data.collection.drop();

    })

    it('Should search data from user input when accessing /api/data/search', async () => {
        await chai.request(server).post('/api/data/').send({ 'letter': 'B', 'frequency': 1.3 });
        await chai.request(server).post('/api/data/').send({ 'letter': 'C', 'frequency': 1.4 });

        //testing search feature with input data only frequency
        const searchData1 = await chai.request(server).post('/api/data/search').send({ 'frequency': 1.3 });
        searchData1.should.have.status(200);
        searchData1.should.be.a.json;
        searchData1.body.should.be.a('array');
        searchData1.body.length.should.equal(1);
        searchData1.body[0].should.have.property('_id');
        searchData1.body[0].should.have.property('letter');
        searchData1.body[0].should.have.property('frequency');
        searchData1.body[0].letter.should.equal('B');
        searchData1.body[0].frequency.should.equal(1.3);

        //testing search feature with input data only letter
        const searchData2 = await chai.request(server).post('/api/data/search').send({ 'letter': 'C' });
        searchData2.should.have.status(200);
        searchData2.should.be.a.json;
        searchData2.body.should.be.a('array');
        searchData2.body.length.should.equal(1);
        searchData2.body[0].should.have.property('_id');
        searchData2.body[0].should.have.property('letter');
        searchData2.body[0].should.have.property('frequency');
        searchData2.body[0].letter.should.equal('C');
        searchData2.body[0].frequency.should.equal(1.4);

        //testting search feature with input data letter and frequency
        const searchData3 = await chai.request(server).post('/api/data/search').send({ 'letter': 'A', 'frequency': 1.2 });
        searchData3.should.have.status(200);
        searchData3.should.be.a.json;
        searchData3.body.should.be.a('array');
        searchData3.body.length.should.equal(1);
        searchData3.body[0].should.have.property('_id');
        searchData3.body[0].should.have.property('letter');
        searchData3.body[0].should.have.property('frequency');
        searchData3.body[0].letter.should.equal('A');
        searchData3.body[0].frequency.should.equal(1.2);
    });

    it('Should list ALL data from database /api/data/ GET', async () => {
        const data = await chai.request(server).get('/api/data')

        data.should.have.status(200);
        data.body.should.be.a('array');
        data.body[0].should.have.property('_id');
        data.body[0].should.have.property('letter');
        data.body[0].should.have.property('frequency');
        data.body[0].letter.should.equal('A');
        data.body[0].frequency.should.equal(1.2);
    });


    it('Should edit a specific data with targeted id  /api/data/:id PUT', async () => {
        const data = await chai.request(server).get('/api/data');
        const id = data.body[0]._id;

        const takeEditedData = await chai.request(server).put(`/api/data/${id}`).send({ 'letter': 'C', 'frequency': 12.2 });

        takeEditedData.should.have.status(201);
        takeEditedData.should.be.json;
        takeEditedData.body.should.have.property('success');
        takeEditedData.body.should.have.property('message');
        takeEditedData.body.should.have.property('data');
        takeEditedData.body.data.should.have.property('_id');
        takeEditedData.body.data.should.have.property('letter');
        takeEditedData.body.data.should.have.property('frequency');
        takeEditedData.body.success.should.equal(true);
        takeEditedData.body.message.should.equal('data have been updated');
        takeEditedData.body.data.letter.should.equal('C');
        takeEditedData.body.data.frequency.should.equal(12.2);

    });

    it('Should add a data into database when accessing  /api/data/ POST', async () => {
        const addedData = await chai.request(server).post('/api/data/').send({ 'letter': 'B', 'frequency': 1.3 });
        addedData.should.have.status(201);
        addedData.should.be.json;
        addedData.body.should.have.property('success');
        addedData.body.should.have.property('message');
        addedData.body.should.have.property('data');
        addedData.body.data.should.have.property('_id');
        addedData.body.data.should.have.property('letter');
        addedData.body.data.should.have.property('frequency');
        addedData.body.success.should.equal(true);
        addedData.body.message.should.equal('data have been added');
        addedData.body.data.letter.should.equal('B');
        addedData.body.data.frequency.should.equal(1.3);
    });

    it('Should Delete a specific data with id from database when accessing  /api/data/id DELETE', async () => {
        const addedData = await chai.request(server).post('/api/data/').send({ 'letter': 'B', 'frequency': 1.3 });
        const id= addedData.body.data._id
        
        const delData= await chai.request(server).delete(`/api/data/${id}`)
        delData.should.have.status(200);
        delData.should.be.json;
        delData.body.should.have.property('success');
        delData.body.should.have.property('message');
        delData.body.should.have.property('data');
        delData.body.data.should.have.property('_id');
        delData.body.data.should.have.property('letter');
        delData.body.data.should.have.property('frequency');
        delData.body.success.should.equal(true);
        delData.body.message.should.equal('data have been deleted');
        delData.body.data.letter.should.equal('B');
        delData.body.data.frequency.should.equal(1.3);
    });

})