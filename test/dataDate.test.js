'use strict'

const chai = require('chai')
const chaiHTTP = require('chai-http')
const server = require('../app')
const { expect } = require('chai');
const DataDate = require('../models/DataDate')
const should = chai.should()
chai.use(chaiHTTP)

describe('>>>TESTING DATA DATE API<<<', () => {
    DataDate.collection.drop();

    beforeEach(async () => {
        let dataDate = new DataDate({
            letter: '2017-12-31',
            frequency: 1.1
        });
        await dataDate.save()
    })

    afterEach(async () => {
        await DataDate.collection.drop();

    })

    it('Should search data from user input when accessing /api/datadate/search', async () => {
        await chai.request(server).post('/api/datadate').send({ 'letter': '2018-12-20', 'frequency': 1.2 });
    
        //testing search feature with input data only frequency
        const searchData1 = await chai.request(server).post('/api/datadate/search').send({ 'frequency': 1.2 });
        searchData1.should.have.status(200);
        searchData1.should.be.a.json;
        searchData1.body.should.be.a('array');
        searchData1.body.length.should.equal(1);
        searchData1.body[0].should.have.property('_id');
        searchData1.body[0].should.have.property('letter');
        searchData1.body[0].should.have.property('frequency');
        searchData1.body[0].letter.should.equal('2018-12-20');
        searchData1.body[0].frequency.should.equal(1.2);

        //testing search feature with input data only letter
        const searchData2 = await chai.request(server).post('/api/datadate/search').send({ 'letter': '2017-12-31' });
        searchData2.should.have.status(200);
        searchData2.should.be.a.json;
        searchData2.body.should.be.a('array');
        searchData2.body.length.should.equal(1);
        searchData2.body[0].should.have.property('_id');
        searchData2.body[0].should.have.property('letter');
        searchData2.body[0].should.have.property('frequency');
        searchData2.body[0].letter.should.equal('2017-12-31');
        searchData2.body[0].frequency.should.equal(1.1);

        //testting search feature with input data letter and frequency
        const searchData3 = await chai.request(server).post('/api/datadate/search').send({ 'letter': '2018-12-20', 'frequency': 1.2 });

        searchData3.should.have.status(200);
        searchData3.should.be.a.json;
        searchData3.body.should.be.a('array');
        searchData3.body.length.should.equal(1);
        searchData3.body[0].should.have.property('_id');
        searchData3.body[0].should.have.property('letter');
        searchData3.body[0].should.have.property('frequency');
        searchData3.body[0].letter.should.equal('2018-12-20');
        searchData3.body[0].frequency.should.equal(1.2);
    });

    it('Should list ALL data from database /api/datadate/ GET', async () => {
        const data = await chai.request(server).get('/api/datadate')

        data.should.have.status(200);
        data.body.should.be.a('array');
        data.body[0].should.have.property('_id');
        data.body[0].should.have.property('letter');
        data.body[0].should.have.property('frequency');
        data.body[0].letter.should.equal('2017-12-31');
        data.body[0].frequency.should.equal(1.1);
    });


    it('Should edit a specific data with targeted id  /api/datadate/:id PUT', async () => {
        const data = await chai.request(server).get('/api/datadate');
        const id = data.body[0]._id;

        const takeEditedData = await chai.request(server).put(`/api/datadate/${id}`).send({ 'letter': '2017-11-31', 'frequency': 12.2 });

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
        takeEditedData.body.data.letter.should.equal('2017-11-31');
        takeEditedData.body.data.frequency.should.equal(12.2);

    });

    it('Should add a data into database when accessing  /api/datadate/ POST', async () => {
        const addedData = await chai.request(server).post('/api/datadate/').send({ 'letter': '2020-12-23', 'frequency': 1.4 });
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
        addedData.body.data.letter.should.equal('2020-12-23');
        addedData.body.data.frequency.should.equal(1.4);
    });

    it('Should Delete a specific data with id from database when accessing  /api/datadate/id DELETE', async () => {
        const addedData = await chai.request(server).post('/api/datadate/').send({ 'letter': '2020-12-23', 'frequency': 1.4 });
        const id= addedData.body.data._id
        
        const delData= await chai.request(server).delete(`/api/datadate/${id}`)
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
        delData.body.data.letter.should.equal('2020-12-23');
        delData.body.data.frequency.should.equal(1.4);
    });

    it('Should find a specific data with id from database when accessing  /api/datadate/id GET', async () => {
        const data = await chai.request(server).get('/api/datadate');
        const id = data.body[0]._id;
      
        
        const getData= await chai.request(server).get(`/api/datadate/${id}`)
       
        getData.should.have.status(200);
        getData.should.be.json;
        getData.body.should.have.property('success');
        getData.body.should.have.property('message');
        getData.body.should.have.property('data');
        getData.body.data.should.have.property('_id');
        getData.body.data.should.have.property('letter');
        getData.body.data.should.have.property('frequency');
        getData.body.success.should.equal(true);
        getData.body.message.should.equal('data found');
        getData.body.data.letter.should.equal('2017-12-31');
        getData.body.data.frequency.should.equal(1.1);
    });

})