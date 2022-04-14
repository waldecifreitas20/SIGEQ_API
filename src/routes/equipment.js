const equipmentController = require('../api/controllers/equipment');

const formValidation = require(
    require('../utils/paths').middlewares.formValidation
);

const {
    checkToken,
    hasPermission
} = require(
    require('../utils/paths').middlewares.authorization
);




module.exports = app => {


    app.get('/equipment/all', equipmentController.getAll);

    app.get('/equipment/search/:id', formValidation.checkParams, equipmentController.getById);

    app.post('/equipment/create', formValidation.equipment, equipmentController.create);

    app.put('/equipment/update', formValidation.equipment, equipmentController.update);

    app.delete('/equipment/delete/:id', formValidation.checkParams, equipmentController.delete);
}