const { utils, models } = require('../../utils/paths');

const { exception } = require(utils.errors);

const UserModel = require(`${models.user}`);
const PermissionModel = require(`${models.permission}`);

module.exports = {

    createUser: async function (userData) {
        try {
            return await UserModel.create(userData);
        } catch (error) {
            throw exception('User already registered', 400);
        }
    },

    findUserByEmail: async function (email) {
        const user = await UserModel.findOne({
            where: { email: email },
            include: PermissionModel
        });
        if (user == null) {
            throw exception('user not found', 401);
        }
        return user;
    },

}