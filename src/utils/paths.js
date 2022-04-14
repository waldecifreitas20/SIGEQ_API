const { resolve: getPath } = require('path');

module.exports = {
    models: {
        index: getPath('src', 'api', 'models'),
        equipment: getPath('./src/api/models/equipment/Equipment.js'),
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
    repositories: getPath('src', 'api', 'repositories'),
    database: getPath('src', 'database', 'db'),
}
