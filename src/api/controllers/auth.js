const express = require('express');
const router =  express.Router();

const userServices = require('../services/authServices');
const formValidation = require('../middlewares/formValidation');

router.use(formValidation);

router.get('/', (req, res) => {
    return res.send({ ok : 'route get'})
});

router.post('/register', async (req, res) => {
    const userData = req.body
    const response = await userServices.register(userData);

    return res.send({ response });
});


module.exports = app => app.use('/auth', router);