const userRepository = require('../repositories/userRepository');
const { generateToken, checkPassword } = require('../../utils/security');

async function register(userData) {
    try {
        const user = await userRepository.createUser(userData);
        return _userDataFormat(user);
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

        if (!checkPassword(userData.password, user.password)) 
            throw 'invalid password';
        
        return _userDataFormat(user);
    } catch(error) {
        return {
            status : 401,
            error,
        }
    }
}


const _getUserPermissions = user => {
    if(!user.permissions)
        return [];
    return user.permissions;
}

const _userDataFormat = user => {
    const userData = {
        id : user.id,
        full_name : user.full_name,
        permissions : _getUserPermissions(user)
    }
    return {
        status : 200,
        user : userData, 
        token : generateToken(userData)  
    }
}

module.exports = {
    register : register,
    login : login,
}