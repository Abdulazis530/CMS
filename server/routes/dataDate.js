const express = require('express');
const router = express.Router();
const Data = require('../models/DataDate')

let response = {
    success: false,
    message: "",
    data: {}
}
// #1 FILTER localhost 3000/api/data/search
router.post('/search', async (req, res, next) => {
    let page = Number(req.query.page) || 1
    let limit = Number(req.query.limit) || 0
    let offset = page * limit - limit
    const { letter, frequency } = req.body

    let filter = { $or: [] }
    const response = {
        totalData: 0,
        data: []
    }
    try {
        if (letter) filter.$or.push({ letter: new RegExp(letter, "i") })
        if (frequency) filter.$or.push({ frequency })
        if (filter.$or.length === 0) return res.status(200).json(response)

        const data = await Data.find(filter)
        const totalData = data.length
        const paginatedData = await Data.find(filter).limit(limit).skip(offset)

        response.totalData = totalData
        paginatedData.forEach(field => {
            const { _id, letter, frequency } = field
            response.data.push({
                _id,
                letter,
                frequency
            })
        })
        res.status(200).json(response)

    } catch (error) {
        console.log(error)
        res.status(500).json([])
    }

});

// #2 READ  localhost 3000/api/datadate
router.get("/", async (req, res, next) => {
    let page = Number(req.query.page) || 1
    let limit = Number(req.query.limit) || 0
    let offset = page * limit - limit

    try {
        const data = await Data.find()
        const totalData = data.length
        let response = {
            totalData,
            data: []
        }
        const paginatedData = await Data.find().limit(limit).skip(offset)
        paginatedData.forEach(field => {
            const { _id, letter, frequency } = field
            response.data.push({
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

// #3 EDIT  localhost 3000/api/datadate/219asdawdaw  
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

// #4 ADD  localhost 3000/api/datadate
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
        const data = await Data.findOne({ _id })
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
