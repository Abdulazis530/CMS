const express = require('express');
const router = express.Router();
const Phonebook = require('../models/phonebook')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const data = await Phonebook.find({})
    res.json(data)
  } catch (error) {
    console.log(error)
    res.json({ error })
  }
});

router.post('/', async (req, res, next) => {
  const { name, phone } = req.body
  console.log(req.body)

  try {
    const data = await Phonebook.create({ name, phone })
    res.status(201).json(data)

  } catch (error) {
    console.log(error)
    res.json({ error })
  }

});


router.put('/:id', async (req, res, next) => {
  const { name, phone } = req.body
  
  try {
    const data = await Phonebook.findByIdAndUpdate(req.params.id,{ name, phone },{new:true})

    res.status(201).json(data)
  } catch (error) {
    console.log(error)
    res.json({ error })
  }

});

router.delete('/:id', async (req, res, next) => {

  try {

    const data = await Phonebook.findByIdAndRemove(req.params.id)
    res.status(201).json(data)

  } catch (error) {

    console.log(error)
    res.json({ error })
  }

});


module.exports = router;
