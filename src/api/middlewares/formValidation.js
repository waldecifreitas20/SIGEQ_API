const { getRequiredFieldsError } = require("../../utils/errors");
const { howManyKeys } = require('../../utils/shorts');


const keysExpectedTo = {
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

        let requiredKeysReceived = howManyKeys(keysReceived, keysExpectedTo.user);

        if (requiredKeysReceived != keysExpectedTo.user.length) {
            return res.status(400).send(
                getRequiredFieldsError(keysExpectedTo.user, requiredKeysReceived)
            );
        }
        return next();
    },

    login: function (req, res, next) {
        const keysReceived = req.body;

        const requiredKeysReceived = howManyKeys(keysReceived, keysExpectedTo.login);

        if (requiredKeysReceived != keysExpectedTo.login.length) {
            return res.status(400).send(
                getRequiredFieldsError(keysExpectedTo.login, requiredKeysReceived)
            );
        }

        return next();
    },

    createEquipment: function (req, res, next) {
        const keysReceived = req.body;

        const requiredKeysReceived = howManyKeys(keysReceived, keysExpectedTo.equipment);

        if (requiredKeysReceived != keysExpectedTo.equipment.length) {
            return res.status(400).send(
                getRequiredFieldsError(keysExpectedTo.equipment, requiredKeysReceived)
            );
        }

        return next();
    },
}