
const UserSchema = require('./../../models/User');
const bcryptjs = require('bcryptjs');
const dotenv = require('dotenv');
const { createToken } = require('./../../utils');

//Obtenemos variables de entorno
dotenv.config({ path: '.env' }) ;

/**
 * Asignacion de variables de entorno
 */
const SEED_TOKEN  = process.env.SEED_TOKEN;
const CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN;

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

const asyncLogin =  async (input)  => {

    const {email, password } = input

    //Revisamos que el username no este dado de alta
    const foundUser = await UserSchema.findOne({ email: email.toLowerCase() });
    if (!foundUser) throw new Error('Email o contraseña incorrecta');

    //Revisamos que el passoword sea el correcto
    const passwordSuccess = await bcryptjs.compare(password, foundUser.password );
    if (!passwordSuccess) throw new Error('Email o contraseña incorrecta');

    //crear token
    const token = await createToken(foundUser, SEED_TOKEN, {expiresIn: CADUCIDAD_TOKEN } );

    return {
        status: true,
        message: 'Usuario Logeado!',
        token
    };
};

//Get user by id or nickname
const getAsyncUser = async (id, nickname) => {

    let user = null;

    if (id) user = await UserSchema.findById({_id: id});
    if (nickname) user = await UserSchema.findOne({nickname});     

    if (!user) {
        return {
            status: false,
            message: 'Usuario no encontrado',
            user : null
        }
    }

    return {
        status: true,
        message: 'Usuario encontrado',
        user
    }
};

//get Users
const getAsyncUsers =  async () => {
    
    const users = await UserSchema.find().sort({createAt: 1});

    console.log(users);

    return users;
};

//Update User


//Delete User


module.exports = {
    addAsyncUser,
    getAsyncUsers,
    getAsyncUser,
    asyncLogin
};