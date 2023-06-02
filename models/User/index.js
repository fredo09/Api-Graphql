/**
 * Schema User
 */

const mongoose = require('mongoose');

const { Schema } = mongoose;

//Creacion de usuarioSchema

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    nickname: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        trim:true
    },
    status: {
        type: String,
        enum : {
            values: ["ACTIVO", "INACTIVO"],
            message: '{VALUE} no es permitido'
        }
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('Users', userSchema);
