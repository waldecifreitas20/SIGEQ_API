const express = require('express');
const router =  express.Router();

const {services, middlewares} = require('../../utils/paths');
const userServices = require(services.auth);
const formValidation = require(middlewares.formValidation);

router.get('/', (req, res) => {
    return res.send({ ok : 'route get'})
});


router.post('/register',formValidation.register, async (req, res) => {
    const userData = req.body;
    var response = await userServices.register(userData);

    return res.status(response.status).send(response);
});

router.post('/authenticate', formValidation.login, async (req, res) => {
    const userData = req.body

    var response = await userServices.login(userData);

    return res.status(response.status).send(response);
});



module.exports = app => app.use('/auth', router);