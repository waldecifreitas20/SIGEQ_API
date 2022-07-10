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

        let requireKeysReceived = howManyKeys(keysReceived, keysExpectedTo.user);

        if (requireKeysReceived != keysExpectedTo.user.length) {
            return res.status(400).send(
                getRequiredFieldsError(keysExpectedTo.user, requireKeysReceived)
            );
        }
        return next();
    },

    login: function (req, res, next) {
        const keysReceived = req.body;

        const requireKeysReceived = howManyKeys(keysReceived, keysExpectedTo.login);

        if (requireKeysReceived != keysExpectedTo.login.length) {
            return res.status(400).send(
                getRequiredFieldsError(keysExpectedTo.login, requireKeysReceived)
            );
        }

        return next();
    },

    createEquipment: function (req, res, next) {
        const keysReceived = req.body;

        const requireKeysReceived = howManyKeys(keysReceived, keysExpectedTo.equipment);

        if (requireKeysReceived != keysExpectedTo.equipment.length) {
            return res.status(400).send(
                getRequiredFieldsError(keysExpectedTo.equipment, requireKeysReceived)
            );
        }

        return next();
    },
}