const paths = require('../../utils/paths');

const userRepository = require(paths.repositories.user);
const { generateToken, isPasswordEqualsHash } = require(paths.utils.security);
const { getErrorResponse } = require(paths.utils.errors);

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


const _checkPassword = (password, validPassword) => {
    if (!isPasswordEqualsHash(password, validPassword)) {
        throw getErrorResponse({
            status: 401,
            error: 'Invalid Credentials',
        });
    }
}


module.exports = {
    register: async function (userData) {
        try {
            const user = await userRepository.createUser(userData);
            return _formatUserData(user);
        } catch (error) {
            return error;
        }
    },

    login: async function (email, password) {
        try {
            const user = await userRepository.findUserByEmail(email);
            _checkPassword(password, user.password);
            return _formatUserData(user);
        } catch (error) {
            return error;
        }
    },
}