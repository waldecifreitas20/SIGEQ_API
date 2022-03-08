const userRepository = require('../repositories/userRepository');
const { genetateToken } = require('../../utils/security');

async function register(userData) {
    try {
        const user = await userRepository.createUser(userData);
        return {
            status : 200,
            user : {
                id : user.id,
                fullName : user.fullName
            },
            token : genetateToken({
                id : user.id,
                fullName : user.fullName, 
                permissions : []
            })
        }
    } catch (error) {
        console.log(error);
        return {
            status : 400,
            error,
        }
    }   
}

async function login(userData) {
    try {
        const user = await userRepository.findUserByEmail(userData.email);
        return {
            status : 200,
            user : {
                id : user.id,
                fullName : user.fullName,
                permissions : user.permissions,
            },
            token : genetateToken({
                id : user.id, 
                fullName: user.fullName, 
                permissions: user.permissions
            })
        }
    } catch(error) {
        return {
            status : 401,
            error,
        }
    }
}

async function isValidToken(token) {}

module.exports = {
    register : register,
    login : login,
    isValidToken : isValidToken
}