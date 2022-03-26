const userRepository = require('../repositories/userRepository');
const { generateToken, checkPassword } = require('../../utils/security');

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
    register : async function(userData) {
        try {
            const user = await userRepository.createUser(userData);
            return _userDataFormat(user);
        } catch (error) {
            return {
                status : 400,
                error,
            }
        }   
    },

    login : async function(email, password) {
        try {
            const user = await userRepository.findUserByEmail(email);
    
            if (!checkPassword(password, user.password)) 
                throw 'invalid password';
            
            return _userDataFormat(user);
        } catch(error) {
            return {
                status : 401,
                error,
            }
        }
    },
}