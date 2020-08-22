const express = require('express');
const router = express.Router();
const Data = require('../models/Data')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
require('dotenv').config()
const secret = process.env.TOKEN_SECRET

let response = {
    success: false,
    message: "",
    data: {}
}

router.get("/", async (req, res, next) => {
    let response = []
    try {
        const data = await Data.find()
        data.forEach(field => {
            const { _id, letter, frequency } = field
            response.push({
                _id,
                letter,
                frequency
            })
        })
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(400).json(response)
    }
})



router.post('/', async (req, res, next) => {
    const { letter, frequency } = req.body

    try {
        const data = new Data({
            letter,
            frequency
        })
        const savedData = await data.save()
        response.success = true
        response.message = "data have been added"
        response.data = {
            _id: savedData._id,
            letter,
            frequency
        }
        res.status(201).json(response)

    } catch (error) {
        console.log(error)
        res.status(500).json(response)
    }

});
module.exports = router;
