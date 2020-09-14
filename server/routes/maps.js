const express = require('express');
const router = express.Router();
const Maps = require('../models/Map')

let response = {
    success: false,
    message: "",
    data: {}
}
// #1 FILTER localhost 3000/api/data/search
router.post('/search', async (req, res, next) => {
    try {
        let page = Number(req.query.page) || 1
        let limit = Number(req.query.limit) || 0
        let offset = page * limit - limit

        const { title } = req.body
        let filter = {}
        const response = {
            totalData: 0,
            data: []
        }

        if (!title) return res.status(200).json(response)
        if (title) filter.title = new RegExp(title, "i")

        const data = await Maps.find(filter)
        const totalData = data.length
        const paginatedData = await Maps.find(filter).limit(limit).skip(offset)

        response.totalData = totalData
        paginatedData.forEach(field => {
            const { _id, title, lat, lng } = field
            response.data.push({
                _id,
                title,
                lat,
                lng
            })
        })

        res.status(200).json(response)

    } catch (error) {
        console.log(error)
        res.status(500).json([])
    }

});

// #2 READ  localhost 3000/api/maps
router.get("/", async (req, res, next) => {
    try {
        let page = Number(req.query.page) || 1
        let limit = Number(req.query.limit) || 0
        let offset = page * limit - limit

        const data = await Maps.find()
        const totalData = data.length

        let response = {
            totalData,
            data: []
        }

        const paginatedData = await Maps.find().limit(limit).skip(offset)
        paginatedData.map(field => {
            const { _id, title, lat, lng } = field
            response.data.push({
                _id,
                title,
                lat,
                lng
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
    try {
        const { title, lat, lng } = req.body
        const _id = req.params.id
        const map = await Maps.findByIdAndUpdate(
            _id,
            { title, lat, lng },
            { new: true }
        )

        if (!map) return res.status(500).json(response)

        response.success = true
        response.message = "data have been updated"
        response.data = { _id, title, lat, lng }

        res.status(201).json(response)
    } catch (error) {
        console.log(error)
        res.status(400).json(response)
    }
})

// #4 ADD  localhost 3000/api/data 
router.post('/', async (req, res, next) => {
    try {
        const { title, lat, lng } = req.body
        const map = new Maps({
            title,
            lat,
            lng
        })
        const savedData = await map.save()

        response.success = true
        response.message = "data have been added"
        response.data = {
            _id: savedData._id,
            title,
            lat,
            lng
        }
        res.status(201).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json(response)
    }

});
// #5 DELETE  localhost 3000/api/data/219asdawdaw  
router.delete("/:id", async (req, res, next) => {
    try {
        const _id = req.params.id
        const map = await Maps.findByIdAndRemove(_id)
        if (!map) return res.status(500).json(response)
        const { title, lat, lng } = map

        response.success = true
        response.message = "data have been deleted"
        response.data = { _id, title, lat, lng }

        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(400).json(response)
    }

})

// #6 FIND  localhost 3000/api/data/219asdawdaw  
router.get("/:id", async (req, res, next) => {
  
    try {
        const _id = req.params.id
        const map = await Maps.findOne({ _id })
        if (!map) return res.status(400).json(response)
        const { title, lat, lng } = map

        response.success = true
        response.message = "data found"
        response.data = { _id, title, lat, lng }
        
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(400).json(response)
    }

})

module.exports = router;
