const { getRequiredFieldsError, getErrorResponse, ERROR_CODE } = require("../../utils/errors");
const { hasKeys, isEmptyObject } = require('../../utils/shorts');


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

        let requiredKeysReceived = hasKeys(keysReceived, keysExpectedTo.user);

        if (requiredKeysReceived != keysExpectedTo.user.length) {
            return res.status(400).send(
                getRequiredFieldsError(keysExpectedTo.user, requiredKeysReceived)
            );
        }
        return next();
    },

    login: function (req, res, next) {
        const keysReceived = req.body;

        const requiredKeysReceived = hasKeys(keysReceived, keysExpectedTo.login);

        if (requiredKeysReceived != keysExpectedTo.login.length) {
            return res.status(400).send(
                getRequiredFieldsError(keysExpectedTo.login, requiredKeysReceived)
            );
        }

        return next();
    },

    createEquipment: function (req, res, next) {
        const keysReceived = req.body;

        const requiredKeysReceived = hasKeys(keysReceived, keysExpectedTo.equipment);

        if (requiredKeysReceived != keysExpectedTo.equipment.length) {
            return res.status(400).send(
                getRequiredFieldsError(keysExpectedTo.equipment, requiredKeysReceived)
            );
        }

        return next();
    },

    isRequestBodyNull: function (req, res, next) {
        const equipment = req.body;
 
        if (isEmptyObject(equipment)) {
            return res.status(400).send(getErrorResponse({
                status: 400,
                code : ERROR_CODE.REQUEST.EMPTY_BODY,
                error: 'none parameter sent',
                description: 'request body is empty'
            }));
        }

        next();
    }
}