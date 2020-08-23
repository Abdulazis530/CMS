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
// #1 FILTER localhost 3000/api/data/search
router.post('/search', async (req, res, next) => {
    const { letter, frequency } = req.body
    let filter ={ $or: [] }
    try {
        if(letter) filter.$or.push({ letter: new RegExp(letter,"i") })
        if(frequency) filter.$or.push({ frequency })
        const data = await Data.find(filter)
        const response = data.map(field=>{ 
            return {
                _id:field._id,
                letter:field.letter,
                frequency:field.frequency   
            }
        })
        res.status(200).json(response)

    } catch (error) {
        console.log(error)
        res.status(500).json([])
    }

});

// #2 READ  localhost 3000/api/data 
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

// #3 EDIT  localhost 3000/api/data/219asdawdaw  
router.put("/:id", async (req, res, next) => {
    const { letter, frequency } = req.body
    const _id = req.params.id
    try {
        const data = await Data.findByIdAndUpdate(
            _id,
            { letter, frequency },
            { new: true }
        )
        if (!data) return res.status(500).json(response)
        response.success = true
        response.message = "data have been updated"
        response.data = { _id, letter, frequency }
        res.status(201).json(response)
    } catch (error) {
        console.log(error)
        res.status(400).json(response)
    }

})

// #4 ADD  localhost 3000/api/data 
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
// #5 DELETE  localhost 3000/api/data/219asdawdaw  
router.delete("/:id", async (req, res, next) => {
    const _id = req.params.id
    try {
        const data = await Data.findByIdAndRemove(_id)
        if (!data) return res.status(500).json(response)
        const { letter, frequency } = data
        response.success = true
        response.message = "data have been deleted"
        response.data = { _id, letter, frequency }
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(400).json(response)
    }

})

// #6 FIND  localhost 3000/api/data/219asdawdaw  
router.get("/:id", async (req, res, next) => {
    const _id = req.params.id
    try {
        const data = await Data.findOne({_id})
        console.log(data)
        if (!data) return res.status(400).json(response)
        const { letter, frequency } = data
        response.success = true
        response.message = "data found"
        response.data = { _id, letter, frequency }
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(400).json(response)
    }

})

module.exports = router;
