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
    author: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Authors'
    },
    editorial: {
        type:String,
        require:true
    }
});

module.exports = mongoose.model('Books', BookSchema);