const express = require('express');
const router = express.Router();

const [ 
    services, 
    permissionsMiddleware 
] = [
    require(require('../../utils/paths').services.equipment),
    require(require('../../utils/paths').middlewares.authorization)
];

router.use(permissionsMiddleware.checkToken);
router.use(permissionsMiddleware.checkPermissions);


router.get('/all', async (req, res) => {
    const response = await services.getAllEquipment();
    return res.status(response.status).send(response);
});


router.get('/by_heritage/:heritage', async (req, res) => {
    const heritage = req.params.heritage;
    const response = await services.getEquipmentBy({heritage : heritage});
    return res.status(response.status).send(response);
});


router.post('/create', async (req, res) => {
    const equipmentData = req.body;
    const response = await services.createEquipment(equipmentData);
    return res.status(response.status).send(response);
});


module.exports = app => app.use('/equipment', router);