const express = require('express');
const router =  express.Router();

const {services, middlewares} = require('../../utils/paths');
const userServices = require(services.auth);

const [formValidation, authorization] = [
    require(middlewares.formValidation),
    require(middlewares.authorization) 
];


router.post('/register',formValidation.register, async (req, res) => {
    const userData = req.body;
    var response = await userServices.register(userData);

    return res.status(response.status).send(response);
});


router.post('/authenticate', formValidation.login, async (req, res) => {
    const userData = req.body;
    var response = await userServices.login(userData);

    return res.status(response.status).send(response);
});


router.post('/check_token', authorization.tokenVerify,(req, res) => {
    return res.status(200).send({message : 'valid token'});
});


module.exports = app => app.use('/auth', router);