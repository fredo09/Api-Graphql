/**
*  
**/

const jwt = require('jsonwebtoken');

const createToken = (user, SECKRET_KEY, expiresIn) => {
    console.log(SECKRET_KEY);
    console.log(expiresIn);
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

module.exports = {
    createToken
}