const router = require('express').Router();

const equipmentController = require('../api/controllers/equipment');

const formValidation = require(
    require('../utils/paths').middlewares.formValidation
);
const { checkToken, hasPermission } = require(
    require('../utils/paths').middlewares.authorization
);

router.use(checkToken);
router.use(hasPermission);

module.exports = app => {

    router.get('/all', equipmentController.getAll);

    router.post('/search', formValidation.isRequestBodyNull, equipmentController.search);

    router.post('/create', formValidation.hasRequiredFields, equipmentController.create);

    router.put('/update', [formValidation.isRequestBodyNull, formValidation.hasEquipmentId], equipmentController.update);

    router.delete('/delete/:id', equipmentController.delete);

    app.use('/equipment', router);
}