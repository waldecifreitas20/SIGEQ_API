const { resolve : getPath } = require('path');
const { models } = require(getPath('src', 'utils', 'paths'));
const UserModel = require(`${models.user}/User`);


async function createUser(userData) {
    try {
        return await UserModel.create(userData);
    } catch (error) {
        return { 
            user : null, 
            status : 401,
            message : 'User already exist' 
        };       
    }
}

module.exports = {
    createUser : createUser
}