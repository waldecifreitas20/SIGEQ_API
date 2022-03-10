const userRepository = require('../repositories/userRepository');
const { genetateToken, checkPassword } = require('../../utils/security');

const userDataFormat = (user, permissions=[]) => {
    return {
        status : 200,
        user : {
            id : user.id,
            full_name : user.full_name,
            permissions : permissions
        }, 
        token : genetateToken({
            id : user.id,
            full_name : user.full_name, 
            permissions : permissions
        })  
    }
}

async function register(userData) {
    try {
        const user = await userRepository.createUser(userData);
        return userDataFormat(user);
    } catch (error) {
        return {
            status : 400,
            error,
        }
    }   
}

async function login(userData) {
    try {
        const user = await userRepository.findUserByEmail(userData.email);

        if (!checkPassword(userData.password, user.password)) {
            throw 'invalid password';
        }
        
        return userDataFormat(user);
    } catch(error) {
        return {
            status : 401,
            error,
        }
    }
}


module.exports = {
    register : register,
    login : login,
}