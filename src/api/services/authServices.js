const userRepository = require('../repositories/userRepository');
const permissionRepository = require('../repositories/permissionRepository');
const permissions = require('../repositories/permissions');
const { genetateToken } = require('../../utils/security');

async function register(userData) {
    try {
        const user = await userRepository.createUser(userData);    

        const _user = await _addPermissions(user);
        return {
            status : 200,
            _user,
            token : genetateToken(userData),
        }
    } catch (error) {
        return {
            status : 400,
            error,
        }
    }   
}

async function _addPermissions(user) {
    try {
        const permission = await permissionRepository.createPermision({
            name : 'add', 
            description : 'aaaaa'
        });

        return await permissionRepository.setLinkBetween(user, permission);
    } catch (error) {
        throw error;
    }
}

async function login(userData) {}

async function isValidToken(token) {}

module.exports = {
    register : register,
    login : login,
    isValidToken : isValidToken
}