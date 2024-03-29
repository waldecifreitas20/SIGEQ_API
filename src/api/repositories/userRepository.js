const { utils, models } = require('../../utils/paths');

const { getErrorResponse, ERROR_CODE, getErrorCode, getErrorDescription } = require('../../utils/errors');

const UserModel = require(`${models.user}`);
const PermissionModel = require(`${models.permission}`);

module.exports = {

    createUser: async function (userData) {
        try {
            return await UserModel.create(userData);
        } catch (error) {       
            const errorCode = getErrorCode(error);
            throw getErrorResponse({
                status: 400,
                code : errorCode,
                error: 'Cannot create user',
                description: getErrorDescription(errorCode)
            });
        }
    },

    findUserByEmail: async function (email) {
        try {
            const user = await UserModel.findOne({
                where: { email: email },
                include: PermissionModel
            });
            
            if (user == null) {
                throw ERROR_CODE.USER.AUTH.INVALID_CREDENTIALS;
            }
            return user;
        } catch (error) {
            const errorCode = getErrorCode(error);
            throw getErrorResponse({
                status: 401,
                code : errorCode,
                error: 'Invalid credentials',
                description: getErrorDescription(errorCode),
            });
        }
    },

}