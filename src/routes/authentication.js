const { middlewares } = require('../utils/paths');
const authController = require('../api/controllers/authentication.js');

const [formValidation, authorization] = [
    require(middlewares.formValidation),
    require(middlewares.authorization)
];

module.exports = app => {

    app.post('/auth/register', formValidation.register, authController.register);

    app.post('/auth/authenticate', formValidation.login, authController.authenticate);

    app.post('/auth/check_token', authorization.checkToken, authController.check_token);
}