
const UserSchema = require('./../../models/User');
const bcryptjs = require('bcryptjs');
const dotenv = require('dotenv');
const { createToken, hashAsyncPassword } = require('./../../utils');


//Obtenemos variables de entorno
dotenv.config({ path: '.env' }) ;

/**
 * Asignacion de variables de entorno
 */
const SEED_TOKEN  = process.env.SEED_TOKEN;
const CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN;

/**
*   add users    
**/
const addAsyncUser = async ({ email, nickname, status, password }) => {


    console.log(password);
    email = email.toLowerCase();
    nickname = nickname.toLowerCase();
    status = status.toUpperCase();

    const foundEmail = await UserSchema.find({email});
    const foundUser = await UserSchema.find({nickname});

    if (foundEmail.length > 0 || foundUser.length > 0) {
        return {
            code: 400,
            message:"Ocurrio un Error",
            error: "Email O Nickname ya registrado",
            status: false,
            user: null
        }
    }

    let newPassword = await hashAsyncPassword(password, 10);

    try { 
        //Guardamos usuario
        const saveUser = new UserSchema({
            nickname,
            email ,
            status,
            password: newPassword
        });
            
        await saveUser.save();
        
        return {
            code: 201,
            message: "Usuario resgistrado",
            status: true,
            error: null,
            user: saveUser
        };

    } catch(err) {
        console.log(err);
        const { message } = err.errors.status;
        // FIXME: VER EL CODIGO DE ERROR Y MOSTRAR EL MISMO EN REGISTRO DE USUARIOS 
        return {
            code: 400,
            message:"Ocurrio un Error",
            error: message,
            status: false,
            user: null
        }
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
        code: 201,
        status: true,
        message: 'Usuario Logeado!',
        token
    };
};

//Get user by id or nickname
const getAsyncUser = async (id, nickname) => {
    //FIXME: CHECAR EL OBJECTO DE RESPONSE
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
    //FIXME: CHECAR EL OBJECTO DE RESPONSE
    const users = await UserSchema.find().sort({createAt: 1});

    console.log(users);

    //FIXME: EXPLORAR POSIBLE ERRORES EN EL MANEJO DE RESPONSE 
    return {
        code: 201,
        message: "Lista de Usuarios",
        status: true,
        error: null,
        users: users
    };

};

//Update User
const updateAsyncUser = async (input, {user: {id}}) => {
    //FIXME: CHECAR EL OBJECTO DE RESPONSE
    console.log("conectando update user");
    console.log(input);

    console.log("Mi id" , id);

    const { currentPassoword, newPassword } = input;
    try {
        if (currentPassoword && newPassword) {

            //Buscamos contraseña del usuario
            const currentUser = await UserSchema.findById(id);

            console.log(currentUser);
        } else {
           let comfirm =  await UserSchema.findByIdAndUpdate(id, input);

           console.log(comfirm);
        }
        return {
            status: true,
            message: "Usuario actualizado"
        };
    } catch(err) {
        console.log(err);
    }
};



module.exports = {
    addAsyncUser,
    getAsyncUsers,
    getAsyncUser,
    updateAsyncUser,
    asyncLogin
};