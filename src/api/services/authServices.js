const userRepository = require('../repositories/userRepository');
const permissionRepository = require('../repositories/permissionRepository');

const permissions = require('../repositories/permissions');
const permissionsIDs = require('../../config/Permissions');

const initPermissions = async () => {
    for (let i = 0; i < permissions.length; i++) {
        await permissionRepository.createPermision(permissions[i]);
    }
}

async function register(userData) {
    try {
        const user = await userRepository.createUser(userData);
        return {
            status : 200,
            user,
        }
    } catch (error) {
        return {
            status : 400,
            error,
        }
    }   
}

async function addPermissionsTo(user, permissionsIds) {
    try {
        
        const permissionGateway = await permissionRepository
                .findPermissionById(1);
                console.log(permissionGateway);
        user = await permissionRepository.setLinkBetween(user, permissionGateway);
                console.log(permissionGateway.id);
                console.log('===============================================');
        
        return {
            status : 200,
            id : 4,
            fullName : 'user.fullName',
            permissions : 'user.permissions',
        };

    } catch (error) {
        console.log(error);
        return {
            status : 406,
            error
        };
    }
}



async function login(userData) {}

async function isValidToken(token) {}

module.exports = {
    initPermissions : initPermissions,
    register : register,
    addPermissionsTo : addPermissionsTo,
    login : login,
    isValidToken : isValidToken
}