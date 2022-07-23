const { ERROR_CODE } = require('../../utils/errors');
const paths = require('../../utils/paths');

const userRepository = require(paths.repositories.user);
const { generateToken, isPasswordEqualsHash } = require(paths.utils.security);
const { getErrorResponse } = require(paths.utils.errors);

const _formatUserData = user => {
    const userData = {
        id: user.id,
        name: user.firstName,
        permissions: _getUserPermissions(user)
    };

    const token = generateToken(userData);
    userData.permissions = _formatUserPermissions(user.permissions);

    return {
        id: userData.id,
        name: userData.name,
        permissions: userData.permissions,
        token,
    };
};

const _getUserPermissions = user => {
    if (!user.permissions)
        return [];
    return user.permissions;
};

const _formatUserPermissions = (userPermissions = []) => {
    let _permissions = [];

    userPermissions.forEach(permission => {
        _permissions.push({
            id: permission.id,
            name: permission.name,
            description: permission.description
        });
    });
    return _permissions;
};

const _checkPassword = (password, validPassword) => {
    if (!isPasswordEqualsHash(password, validPassword)) {
        throw getErrorResponse({
            status: 401,
            error: 'Invalid Credentials',
        });
    }
};


module.exports = {
    register: async function (userData) {
        try {
            const user = await userRepository.createUser(userData);
            return _formatUserData(user);
        } catch (error) {
            return {
                status: error.status,
                code: error.code,
                error: error.error
            };
        }
    },

    login: async function (email, password) {
        try {
            const user = await userRepository.findUserByEmail(email);
            _checkPassword(password, user.password);
            return {
                status: 200,
                user: _formatUserData(user),
            };
        } catch (error) {
            return {
                status: error.status,
                code: error.code,
                error: error.error
            };
        }
    },
};