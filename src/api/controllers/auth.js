const express = require('express');
const router =  express.Router();
const {services, middlewares} = require('../../utils/paths');
const permissions = require('../../config/Permissions');
const userServices = require(services.auth);

const { genetateToken } = require('../../utils/security');

router.use(require(middlewares.formValidation));

router.get('/', (req, res) => {
    return res.send({ ok : 'route get'})
});

//userServices.initPermissions();

router.post('/register', async (req, res) => {
    const userData = req.body;
    var response = await userServices.register(userData);

    if (response.status == 200) {   

        const userId = response.user.id;

        response = await userServices.addPermissionsTo(response.user, [
            permissions.ADD,
            permissions.DELETE,
            permissions.READ
        ]);

        response.token = genetateToken(response)

    }
    
    return res.status(response.status).send(response);
});




module.exports = app => app.use('/auth', router);