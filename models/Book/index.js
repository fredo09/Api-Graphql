const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    publication: {
        type: String,
    },
    editorial: {
        type:String,
        require:true
    }
});

module.exports = mongoose.model('Books', BookSchema);