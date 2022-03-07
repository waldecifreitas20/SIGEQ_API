const userRepository = require('../repositories/userRepository');
const permissionRepository = require('../repositories/permissionRepository');
const permissions = require('../repositories/permissions');


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

async function addPermissionsTo(user, permissionsData) {
    try {
        var userPermissions = [];
       
        for (let i = 0; i < permissionsData.length; i++) {
            userPermissions.push(await permissionRepository.createPermision(permissionsData[i]));
        }
        console.log(user.id);
        return {
            status : 200,
            id : user.id,
            fullName : user.fullName,
            permissions : userPermissions,
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
    register : register,
    addPermissionsTo : addPermissionsTo,
    login : login,
    isValidToken : isValidToken
}