/**
*  
**/

const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

/**
 * Creamos token 
 * @param {*} user 
 * @param {*} SECKRET_KEY 
 * @param {*} expiresIn 
 * @returns 
 */
const createToken = (user, SECKRET_KEY, expiresIn) => {
    const { _id, nickname, email  } =  user;

    const payload = {
        id: _id,
        nickname,
        email
    };

    return {
        token : jwt.sign(payload, SECKRET_KEY, expiresIn)
    }
};

/**
 * Encriptamos contraseña
 * @param {*} password 
 * @param {*} rounds 
 * @returns 
 */
const hashAsyncPassword =  async(password, rounds) => {
    const salt = await bcryptjs.genSaltSync(rounds);
    let newPassword = await bcryptjs.hash(password, salt);

    return newPassword;
}

module.exports = {
    createToken,
    hashAsyncPassword
}