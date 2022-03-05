const userRepository = require('../repositories/userRepository');
const { genetateToken } = require('../../utils/security');

const _getFirstName = userFullName => userFullName.split(' ')[0];

async function register(userData) {
    try {
        const user = await userRepository.createUser(userData);    
        return {
            status : 200,
            id : user.id,
            name : _getFirstName(user.fullName),
            token : genetateToken(userData)
        }
    } catch (error) {
        return {
            status : 400,
            error,
        }
    }   
}

async function login(userData) {}

async function isValidToken(token) {}

module.exports = {
    register : register,
    login : login,
    isValidToken : isValidToken
}