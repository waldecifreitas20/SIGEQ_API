const { resolve : getPath } = require('path');

module.exports = {
    models : {
        index : getPath('src', 'api', 'models'),
        equipment : getPath('src', 'api', 'models', 'equipment'),
        user : getPath('src', 'api', 'models', 'user'),
    },
    services : {
        index : getPath('src', 'api', 'services'),
        auth : getPath('src', 'api', 'services', 'authServices'),
    },
    middlewares : {
        index : getPath('src', 'api', 'middlewares'),
        formValidation : getPath('src', 'api', 'middlewares', 'formValidation'),
    },
    controllers : {
        index : getPath('src', 'api', 'controllers'),
    },
    repositories : getPath('src', 'api', 'repositories'),
    database : getPath('src', 'database', 'db'),
}
