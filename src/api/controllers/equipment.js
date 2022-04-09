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
router.use(permissionsMiddleware.hasPermission);


router.get('/all', async (req, res) => {
    const response = await services.getAllEquipment();
    return res.status(response.status).send(response);
});


router.get('/by_heritage/:heritage', async (req, res) => {
    const { heritage } = req.params;
    const response = await services.getEquipmentBy({ heritage: heritage });
    return res.status(response.status).send(response);
});


router.post('/create', async (req, res) => {
    const equipmentData = req.body;
    const response = await services.createEquipment(equipmentData);
    return res.status(response.status).send(response);
});

router.put('/update', async (req, res) => {
    const equipmentData = req.body;
    const response = await services.updateEquipment(equipmentData);
    return res.status(response.status).send(response);
});

router.delete('/delete/:equipment_id', async (req, res) => {
    const { equipment_id } = req.params;
    const response = await services.deleteEquipmentById(equipment_id);
    return res.status(response.status).send(response);
});

module.exports = app => app.use('/equipment', router);