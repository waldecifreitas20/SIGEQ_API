const userRepository = require('../repositories/userRepository');
const { generateToken, checkPassword } = require('../../utils/security');
const { exception } = require('../../utils/shorts');

const _getUserPermissions = user => {
    if (!user.permissions)
        return [];
    return user.permissions;
}

const _formatUserData = user => {
    const userData = {
        id: user.id,
        name: user.first_name,
        permissions: _getUserPermissions(user)
    }
    return {
        status: 200,
        user: userData,
        token: generateToken(userData)
    }
}

const _getErrorReturns = error => {
    return {
        status: error.errorCode,
        error: error.message,
    };
}

module.exports = {
    register: async function (userData) {
        try {
            const user = await userRepository.createUser(userData);
            return _formatUserData(user);
        } catch (error) {
            return _getErrorReturns(error);
        }
    },

    login: async function (email, password) {
        try {
            const user = await userRepository.findUserByEmail(email);

            if (!checkPassword(password, user.password)) {
                throw exception('invalid password');
            }
            return _formatUserData(user);
        } catch (error) {
            return _getErrorReturns(error);
        }
    },
}