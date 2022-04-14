const express = require('express');
const router = express.Router();

const [
    permissionsMiddleware,
    formValidation,
    equipmentRoutes
] = [
        require(require('../../utils/paths.js').middlewares.authorization),
        require(require('../../utils/paths.js').middlewares.formValidation),
        require('../../routes/equipment.js')
    ];


router.use(permissionsMiddleware.checkToken);
router.use(permissionsMiddleware.hasPermission);



router.get('/all', equipmentRoutes.getAll);

router.get('/search/:id', formValidation.checkParams, equipmentRoutes.getById);

router.post('/create', formValidation.equipment, equipmentRoutes.create);

router.put('/update', formValidation.equipment, equipmentRoutes.update);

router.delete('/delete/:equipment_id', formValidation.checkParams, equipmentRoutes.delete);


module.exports = app => app.use('/equipment', router);