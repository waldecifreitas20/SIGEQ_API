const { utils, models } = require('../../utils/paths');

const { getErrorResponse } = require('../../utils/errors');

const UserModel = require(`${models.user}`);
const PermissionModel = require(`${models.permission}`);

module.exports = {

    createUser: async function (userData) {
        try {
            return await UserModel.create(userData);
        } catch (error) {
            throw getErrorResponse({
                status: 400,
                error: 'Cannot create user',
                description: 'User might already to be registered. Check fields.'
            });
        }
    },

    findUserByEmail: async function (email) {
        const user = await UserModel.findOne({
            where: { email: email },
            include: PermissionModel
        });
        if (user == null) {
            throw getErrorResponse({
                status: 401,
                error: 'Invalid credentials',
            });
        }
        return user;
    },

}