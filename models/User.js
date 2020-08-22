require('dotenv').config()
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
    }
})

userSchema.pre("save", async function(next){
    try {
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = hashedPassword
        console.log('password succesfully hashed')
        next();
    } catch (error) {
        console.log(error)
    }
});
userSchema.methods.createToken=function(next){
    const token = jwt.sign({ email:this.email }, secret);
    next(token)
}

module.exports = mongoose.model('User', userSchema)