const UserModel = require('../models')('User');

async function createUser(userData) {
    try {
        return await UserModel.create(userData);
    } catch (error) {
        return { 
            user : null, 
            status : 401 
        };       
    }
}

module.exports = {
    createUser : createUser
}