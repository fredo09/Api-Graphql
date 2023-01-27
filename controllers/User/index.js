
const UserSchema = require('./../../models/User');

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    console.log(input);

    const {email, password } = input

    //Revisamos que el username no este dado de alta
    const foundUser = await UserSchema.findOne({ email: email.toLowerCase() });
    if (!foundUser) throw new Error('Email o contraseña incorrecta');

    //Revisamos que el passoword sea el correcto
    const passwordSuccess = await bcryptjs.compare(password, foundUser.password );
    if (!passwordSuccess) throw new Error('Email o contraseña incorrecta');

    //crear token

    const token = await createToken(foundUser, 'Semilla-de-Desarrollo', {expiresIn: '48h'} )


    console.log('token' , token);
    return {
        status: true,
        message: 'Usuario Logeado!',
        token
    };
};


/**
 * vSEED=Semilla-de-Desarrollo
CADUCIDAD_TOKEN='48h'
 */
const createToken = (user, seed , expiresIn ) => {
    console.log(user)
    const { _id, nickname, email  } =  user;

    const payload = {
        id: _id,
        nickname,
        email
    };

    return {
        token : jwt.sign(payload, seed, expiresIn)
    }
}

//Search user by id or nickname

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
    asyncLogin
};