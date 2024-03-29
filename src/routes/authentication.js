const router = require('express').Router();

const { middlewares } = require('../utils/paths');
const authController = require('../api/controllers/authentication.js');

const [formValidation, authorization] = [
    require(middlewares.formValidation),
    require(middlewares.authorization)
];

module.exports = app => {

    router.post('/register', formValidation.hasRequiredFields, authController.register);

    router.post('/authenticate', formValidation.hasRequiredFields, authController.authenticate);

    router.post('/check_token', authorization.checkToken, authController.check_token);

    app.use('/auth', router);
}