const userRepository = require('../repositories/userRepository');
const { generateToken, checkPassword } = require('../../utils/security');

const getUserPermissions = user => {
    if(!user.permissions)
        return [];
    return user.permissions;
}

const userDataFormat = user => {
    const userData = {
        id : user.id,
        full_name : user.full_name,
        permissions : getUserPermissions(user)
    }
    return {
        status : 200,
        user : userData, 
        token : generateToken(userData)  
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