const userRepository = require('../repositories/userRepository');
const { genetateToken } = require('../../utils/security');

async function register(userData) {
    if (!userData) {
        return { 
            error : 'user is null', 
            status : 401 
        };
    }

    const user = await userRepository.createUser(userData);    
    const [name, ...trash] = user.fullName.split(' ');

    return {
        name : name,  
        token : genetateToken(userData),
        status : 200          
    }
}

async function login(userData) {}

async function isValidToken(token) {}

module.exports = {
    register : register,
    login : login,
    isValidToken : isValidToken
}