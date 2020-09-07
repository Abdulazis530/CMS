require('dotenv').config()
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { response } = require('express');
const saltRounds = 10;
const secret = process.env.TOKEN_SECRET


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,
        max: 100
    },
    token:String
})

userSchema.pre("save", async function (next) {
    try {
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = hashedPassword
        console.log('password succesfully hashed')
        next();
    } catch (error) {
        console.log(error)
    }
});

userSchema.methods.comparePassword = async function (password, check) {
    const result = await bcrypt.compare(password, this.password)
    check(result)
}


module.exports = mongoose.model('User', userSchema)