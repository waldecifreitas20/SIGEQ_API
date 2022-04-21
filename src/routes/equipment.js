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
    
    router.get('/search/:id', formValidation.checkParams, equipmentController.getById);

    router.post('/create', formValidation.equipment, equipmentController.create);

    router.put('/update', formValidation.equipment, equipmentController.update);

    router.delete('/delete/:id', formValidation.checkParams, equipmentController.delete);

    app.use('/equipment', router);
}