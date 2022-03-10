const express = require('express');
const router = express.Router();

const { services, middlewares } = require('../../utils/paths');
const equipmentServices = require(services.equipment);

const permissionsMiddleware = require(middlewares.authorization).checkPermissions;


router.use(permissionsMiddleware);

router.get('/', (req, res) => {
    return res.status(200).send({ok : 'all right'});
});

router.get('/by_heritage/:heritage', (req, res) => {
    const heritage = req.params.heritage;

    const response = equipmentServices.getEquipmentBy({heritage : heritage});

    return res.status(response.status).send(response);
});

module.exports = app => app.use('/equipment', router);