const mongoose =require('mongoose')

const phonebookSchema = new mongoose.Schema({
    name: String,
    phone: String
})

module.exports=mongoose.model('Phonebook',phonebookSchema)