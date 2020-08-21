const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const secret

require('dotenv').config()


/* GET users listing. */

router.get('/list', async (req, res) => {
  let response = []
  try {
    const result = await User.find({})
    response = result.map(item => {
      return {
        _id: item._id,
        email: item.email,
        password: item.password,
      }
    })

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ response });
  }
})



router.post('/register', async (req, res, next) => {
  const { email, password, retypepassword } = req.body

  const response = { data: null, token: null, message: "" }

  if (password === retypepassword) {
    try {
      //checking email if already exist in database
      const emailDb = await User.findOne({ email })
      response.message = `this ${email} already exists`
      if (emailDb) return res.json(response)

      //if email !emailDb
   
      //hashed password
      const hashedPassword = await bcrypt.hash(password, saltRounds)
      //send to db
      const newUser = new User({ email, password: hashedPassword })
      await newUser.save()

      //generating token for user
      const token = jwt.sign({ email }, process.env.TOKEN_SECRET);
      res.header('auth-token', token).send(token)

      //changing response containing result
      response.data.email = email
      response.message = "register success"
      response.token = token

      res.status(201).json(response)

    } catch (error) {
      console.log(error)
      res.status(400).json(response)
    }
  } else {
    response.message = "email or password wrong"
    res.status(500).json(response)
  }


});


router.put('/:id', async (req, res, next) => {
  const { name, phone } = req.body

  try {
    const data = await Phonebook.findByIdAndUpdate(req.params.id, { name, phone }, { new: true })

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
