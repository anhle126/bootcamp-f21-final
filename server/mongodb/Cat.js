const mongoose = require('mongoose');
const { Schema } = mongoose;

const catSchema = new Schema({
    name: String,
    image: String,
    age: Number, 
    location: String, 
    breed: String, 
    isAdopted: Boolean
})

module.exports = mongoose.models?.Cat || mongoose.model("Cat", catSchema)