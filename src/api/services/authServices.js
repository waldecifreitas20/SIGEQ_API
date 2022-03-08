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


async function login(userData) {}

async function isValidToken(token) {}

module.exports = {
    register : register,
    login : login,
    isValidToken : isValidToken
}