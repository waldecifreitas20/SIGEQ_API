const router = require('express').Router();

const equipmentController = require('../api/controllers/equipment');

const formValidation = require(
    require('../utils/paths').middlewares.formValidation
);
const { checkToken, hasPermission } = require(
    require('../utils/paths').middlewares.authorization
);

router.use(checkToken);

module.exports = app => {

    router.get('/all',hasPermission, equipmentController.getAll);

    router.post('/search', [hasPermission,formValidation.isRequestBodyNull], equipmentController.search);

    router.post('/create', [hasPermission,formValidation.hasRequiredFields], equipmentController.create);

    router.put('/update', [hasPermission, formValidation.isRequestBodyNull, formValidation.hasEquipmentId], equipmentController.update);

    router.delete('/delete', hasPermission, equipmentController.delete);

    app.use('/equipment', router);
}