const { resolve : getPath } = require('path');
const { models } = require(getPath('src', 'utils', 'paths'));

const UserModel = require(`${models.user}`);
const PermissionModel = require(`${models.permission}`);

async function createUser(userData) {
    try {
        return await UserModel.create(userData);
    } catch (error) {
        throw 'User already registered';   
    }
}

async function findUserByEmail(email) {
    try {
        const user = await UserModel.findOne({
            where : {email : email}, 
            include : PermissionModel
        });
        if (user == null) {
            throw 'user not found';
        }
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


module.exports = {
    createUser : createUser,
    findUserByEmail : findUserByEmail,
}