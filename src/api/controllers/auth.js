const express = require('express');
const router =  express.Router();
const {services, middlewares} = require('../../utils/paths');
const permissions = require('../repositories/permissions');
const userServices = require(services.auth);

const { genetateToken } = require('../../utils/security');

router.use(require(middlewares.formValidation));

router.get('/', (req, res) => {
    return res.send({ ok : 'route get'})
});

router.post('/register', async (req, res) => {
    const userData = req.body;
   
    var response = await userServices.register(userData);
    console.log(response.user.id);
    if (response.status == 200) {   
        const user = {
            id : response.user.id,
            fullName : response.user.fullName
        }
        
        response = await userServices.addPermissionsTo(user, [
            permissions.add,
            permissions.delete,
            permissions.read
        ]);

        response.token = genetateToken(response)

    }
    
    return res.status(response.status).send(response);
});


module.exports = app => app.use('/auth', router);