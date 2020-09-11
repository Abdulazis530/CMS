const express = require('express');
const router = express.Router();
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
require('dotenv').config()
const secret = process.env.TOKEN_SECRET



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
        token: item.token
      }
    })
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ response });
  }
})

router.post('/register', async (req, res, next) => {
  let response = { data: {}, token: null, message: "" }
  const { email, password, retypepassword } = req.body
  if (password === retypepassword) {
    try {
      const emailDb = await User.findOne({ email })
      if (emailDb) {
        response.message = `Email already exists`
        return res.status(200).json(response)
      }
      const token = jwt.sign({ email }, secret)
      const newUser = new User({ email, password, token })
      await newUser.save()
      response.data = { email }
      response.message = 'register success'
      response.token = token
      res.status(201).json(response)
    } catch (error) {
      res.status(500).json(response)
    }
  } else {
    response.message = "Email or password wrong!"
    res.status(200).json(response)
  }
});

router.post('/login', async (req, res, next) => {

  let response = { data: {}, token: null, message: "" }
  const { email, password } = req.body
 
  try {
    const user = await User.findOne({ email })
    if (!user) {
      response.message = 'Email or password wrong!'
      return res.status(200).json(response)
    }
 
    const check = await bcrypt.compare(password, user.password)
 
    if (check) {
 
      if (user.token) {
        response.data.email = email
        response.message = "login success"
        response.token = user.token
        res.status(201).json(response)
      } else {

        const newToken = jwt.sign({ email }, secret)
        const updateUser = await User.updateOne({ email: user.email }, { token: newToken })
        response.data.email = email
        response.message = "login success"
        response.token = newToken
        res.status(201).json(response)

        if (!updateUser) {
          response.message = "update token failed"
          return res.status(500).json(response)
        }

      }

    } else {
      response.message = 'Email or password wrong!'
      res.status(200).json(response)
    }
  } catch (error) {
    console.log(error)
    response.message = "Email or password wrong"
    res.status(500).json(response)
  }

});

router.post('/check', async (req, res, next) => {
  
  const token = req.header("Authorization")

  let response = {
    valid: false
  };

  try {
    const decoded = jwt.verify(token, secret);
    if (!decoded) return res.status(200).json(response)

    const user = await User.findOne({ email: decoded.email })
    if (!user) return res.status(200).json(response)

    response.valid = true
    res.status(200).json(response)

  } catch (error) {
    console.log(error);
    res.status(500).json(response)
  }

});


router.get('/destroy', async (req, res, next) => {
  const token = req.header("Authorization")

  let response = {
    logout: false
  };
  if (token) {
    try {
      const decoded = jwt.verify(token, secret);
      if (!decoded) return res.status(500).json(response)

      const user = await User.findOneAndUpdate({ email: decoded.email },{ token: undefined })
      if (!user) return res.status(500).json(response)
      
      response.logout = true
      res.status(200).json(response)

    } catch (error) {
      console.log(error)
      res.status(200).json(response)
    }
  } else {
    res.status(500).json(response)
  }
});

module.exports = router;
