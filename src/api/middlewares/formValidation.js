const { getRequiredFieldsErrorResponse } = require("../../utils/errors");
const { howManyKeys } = require('../../utils/shorts');


const keysExpectedFor = {
    user: ['firstName', 'surname',
        'email', 'password', 'cpf',
    ],
    equipment: [
        "title", "model", "categoryId",
        "manufacturerId", "locationId", "statusId"
    ],
    login: ['email', 'password'],

}

module.exports = {

    register: function (req, res, next) {
        const keysReceived = req.body;

        let requiredFields = howManyKeys(keysReceived, keysExpectedFor.user);

        if (requiredFields != keysExpectedFor.user.length) {
            return res.status(400).send(
                getRequiredFieldsErrorResponse(keysExpectedFor.user, requiredFields)
            );
        }
        return next();
    },

    login: function (req, res, next) {
        const keysReceived = req.body;

        const requiredFields = howManyKeys(keysReceived, keysExpectedFor.login);
        console.log(requiredFields);
        if (requiredFields != keysExpectedFor.login.length) {
            return res.status(400).send(
                getRequiredFieldsErrorResponse(keysExpectedFor.login, requiredFields)
            );
        }

        return next();
    },

    createEquipment: function (req, res, next) {
        const keysReceived = req.body;

        const requiredFields = howManyKeys(keysReceived, keysExpectedFor.equipment);

        if (requiredFields != keysExpectedFor.equipment.length) {
            return res.status(400).send(
                getRequiredFieldsErrorResponse(keysExpectedFor.equipment, requiredFields)
            );
        }

        return next();
    },
}