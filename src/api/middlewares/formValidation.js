const { getRequiredFieldsError, getErrorResponse, ERROR_CODE } = require("../../utils/errors");
const { hasManyKeys, isEmptyObject, hasEmptyFields } = require('../../utils/shorts');


const keysExpectedTo = {
    registerUser: [
        'firstName', 'surname',
        'email', 'password', 'cpf',
    ],
    createEquipment: [
        "title", "model", "categoryId",
        "manufacturerId", "locationId", "statusId"
    ],
    login: ['email', 'password'],

}

module.exports = {

    isRequestBodyNull: function (req, res, next) {
        const equipment = req.body;

        if (isEmptyObject(equipment)) {
            return res.status(400).send(getErrorResponse({
                status: 400,
                code: ERROR_CODE.REQUEST.EMPTY_BODY,
                error: 'none parameter sent',
                description: 'request body is empty'
            }));
        }

        next();
    },

    hasEquipmentId: function (req, res, next) {
        const id = req.body.id;

        if (!id) {
            return res.status(400).send(getErrorResponse({
                status: 400,
                code: ERROR_CODE.EQUIPMENT.ID_NOT_SENT,
                error: 'equipment id not found',
                description: 'there is not equipment id on request body'
            }));
        }
        next();
    },
    
    hasRequiredFields: function (req, res, next) {
        const keysReceived = req.body;
        const URL = req.originalUrl;

        let keysExpected;

        if (URL.indexOf('create') !== -1) {
            keysExpected = keysExpectedTo.createEquipment;
        } else if (URL.indexOf('register') !== -1) {
            keysExpected = keysExpectedTo.registerUser;
        
        } else if (URL.indexOf('authenticate') !== -1) {
            keysExpected = keysExpectedTo.login;
        }

        const numberKeysReceived = hasManyKeys(keysReceived, keysExpected);

        const cond1 = numberKeysReceived != keysExpected.length;
        const cond2 = hasEmptyFields(keysReceived, keysExpected);
        
        if (cond1 || cond2) {
            return res.status(400).send(
                getRequiredFieldsError(keysExpected, numberKeysReceived)
            );
        }
    
        next();
    }
}