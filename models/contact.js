const mongoose = require('mongoose')

const Contact = mongoose.Schema({
    email:String,
    password:String,
})

module.exports = mongoose.model("Login", Contact)