const express = require('express');
const router = express.Router();

const [
    services,
    permissionsMiddleware,
    formValidation
] = [
        require(require('../../utils/paths').services.equipment),
        require(require('../../utils/paths').middlewares.authorization),
        require(require('../../utils/paths').middlewares.formValidation),
    ];

router.use(permissionsMiddleware.checkToken);
router.use(permissionsMiddleware.hasPermission);



router.get('/all', async (req, res) => {
    const response = await services.getAllEquipment();
    return res.status(response.status).send(response);
});


router.get('/search/:id', formValidation.checkParams, async (req, res) => {
    const { id } = req.params;
    const response = await services.getEquipmentByField({ id: id });
    return res.status(response.status).send(response);
});


router.post('/create', formValidation.equipment, async (req, res) => {
    const equipmentData = req.body;
    const response = await services.createEquipment(equipmentData);
    return res.status(response.status).send(response);
});

router.put('/update', formValidation.equipment, async (req, res) => {
    const equipmentData = req.body;

    const response = await services.updateEquipment(equipmentData);
    return res.status(response.status).send(response);
});

router.delete('/delete/:equipment_id', formValidation.checkParams, async (req, res) => {
    const { equipment_id } = req.params;
    const response = await services.deleteEquipmentById(equipment_id);
    return res.status(response.status).send(response);
});


module.exports = app => app.use('/equipment', router);