const mongoose = require('mongoose');
const { Schema } = mongoose;

const applicationSchema = new Schema({
    name: String,
    location: String,
    email: String,
    phone: String
})

module.exports = mongoose.models?.Application || mongoose.model("Application", applicationSchema)