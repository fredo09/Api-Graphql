
const UserSchema = require('./../../models/User');

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./../../models/User');

/**
*   Agregasmo usuarios    
**/
const addAsyncUser = async (input) => {
    console.log("entrada", input);
    const payloadUser = input;
    payloadUser.email = payloadUser.email.toLowerCase();
    payloadUser.nickname = payloadUser.nickname.toLowerCase();
    
    const {email, nickname, password } = payloadUser;

    const foundEmail = await UserSchema.find({email});
    if (foundEmail.length > 0) throw new Error("Email ya registrado");

    const foundUser = await UserSchema.find({nickname});
    if (foundUser.length > 0) throw new Error("Nickname ya registrado");


    //Encriptar password
    const salt = await bcryptjs.genSaltSync(10);
    let newPassword = await bcryptjs.hash(password, salt);

    try { 
        //Guardamos usuario
        const saveUser = new UserSchema({
            nickname,
            email ,
            password: newPassword
        });
    
        saveUser.save();

        return saveUser;

    } catch(err) {
        console.log(err);
    }

};

//login

//Search user by id or nickname

//get Users

//Update User


//Delete User


module.exports = {
    addAsyncUser
};