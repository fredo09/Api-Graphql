/**
 * Schema Likes
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;


/**
 * Creacion Likes
 */

const likesSchema = new Schema({
    //id tweet a la que se le dara el like
    tweet: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Tweets"
    },
    //usuario que dio el like
    user: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Users"
    }
});

module.exports = mongoose.model('Likes', likesSchema);

