const mongoose = require('mongoose');

const ContactUs = mongoose.Schema({
    name: String,
    email: String,
    message: String
})

module.exports = mongoose.model("Contact", ContactUs)