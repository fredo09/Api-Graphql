/**
 * Schema Tweet
 */

 const mongoose = require('mongoose');
 const { Schema } = mongoose;
 

/**
 * Creacion de Schema Tweets
 */

const tweetSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        require:true,
        ref: 'Users'
    },
    tweet: {
        type: String,
        require: true,
        maxlength: [60, 'Maximo de 60 caracteres']
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model('Tweets', tweetSchema);