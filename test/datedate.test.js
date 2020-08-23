'use strict'

const chai = require('chai')
const chaiHTTP = require('chai-http')
const server = require('../app')
const { expect } = require('chai');
const DataDate = require('../models/Datadate')
const should = chai.should()
chai.use(chaiHTTP)