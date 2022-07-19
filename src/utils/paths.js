const { resolve: getPath } = require('path');

module.exports = {

    database: getPath('src', 'database', 'db'),

    models: {
        index: getPath('src', 'api', 'models'),
        equipment: getPath('src', 'api', 'models', 'equipment', 'Equipment'),
        location: getPath('src', 'api', 'models', 'equipment', 'Location'),
        status: getPath('src', 'api', 'models', 'equipment', 'Status'),
        category: getPath('src', 'api', 'models', 'equipment', 'Category'),
        manufacturer: getPath('src', 'api', 'models', 'equipment', 'Manufacturer'),
        user: getPath('src', 'api', 'models', 'user', 'User'),
        permission: getPath('src', 'api', 'models', 'user', 'Permission')
    },

    services: {
        index: getPath('src', 'api', 'services'),
        auth: getPath('src', 'api', 'services', 'authServices'),
        equipment: getPath('src', 'api', 'services', 'equipmentServices'),
    },

    middlewares: {
        index: getPath('src', 'api', 'middlewares'),
        formValidation: getPath('src', 'api', 'middlewares', 'formValidation'),
        authorization: getPath('src', 'api', 'middlewares', 'authorization'),
    },

    controllers: {
        index: getPath('src', 'api', 'controllers'),
        auth: getPath('src', 'api', 'controllers', 'auth'),
        equipment: getPath('src', 'api', 'controllers', 'equipment'),
    },

    routes: {
        index: getPath('src', 'routes'),
        auth: getPath('src', 'routes', 'auth'),
        equipment: getPath('src', 'routes', 'equipment'),
    },

    utils: {
        security: getPath('src', 'utils', 'security'),
        errors: getPath('src', 'utils', 'errors'),
        shorts: getPath('src', 'utils', 'shorts'),
    },

    repositories: {
        user: getPath('src', 'api', 'repositories', 'userRepository'),
        equipment: getPath('src', 'api', 'repositories', 'equipmentRepository'),
    },

}
