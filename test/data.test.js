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

    it('Should search data from user input when accessing ', async () => {
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
        const searchData3 = await chai.request(server).post('/api/data/search').send({ 'letter': 'A','frequency':1.2 });
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




})