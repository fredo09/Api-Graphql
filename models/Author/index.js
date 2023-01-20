/**
*   Creacion de Author Schema  
**/

const mongoose = require('mongoose');
const { Schema } = mongoose;

const authorSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number
    },
    currentCity: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model('Authors', authorSchema);