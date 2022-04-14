const express = require('express');
const router = express.Router();

const { middlewares } = require('../../utils/paths');
const authRoutes = require('../../routes/authentication.js');

const [formValidation, authorization] = [
    require(middlewares.formValidation),
    require(middlewares.authorization)
];

router.post('/register', formValidation.register, authRoutes.register);

router.post('/authenticate', formValidation.login, authRoutes.authenticate);

router.post('/check_token', authorization.checkToken, authRoutes.check_token);


module.exports = app => app.use('/auth', router);