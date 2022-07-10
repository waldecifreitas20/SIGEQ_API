const { getRequiredFieldsErrorResponse } = require("../../utils/errors");

const _hasManyExpectedKeys = (keysExpected = [], object = {}) => {
    let requiredFields = 0;

    for (let i = 0; i < keysExpectedFor.login.length; i++) {
        const key = keysExpected[i];
        if (object.hasOwnProperty(key)) {
            requiredFields++;
        }
    }
    return requiredFields;
};

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

        let requiredFields = _hasManyExpectedKeys(keysExpectedFor.user, keysReceived);

        if (requiredFields != keysExpectedFor.user.length) {
            return res.status(400).send(
                getRequiredFieldsErrorResponse(keysExpectedFor.user, requiredFields)
            );
        }
        return next();
    },

    login: function (req, res, next) {
        const user = req.body;

        const requiredFields = _hasManyExpectedKeys(keysExpectedFor.login, user);

        if (requiredFields != keysExpectedFor.login.length) {
            return res.status(400).send(
                getRequiredFieldsErrorResponse(keysExpected, requiredFields)
            );
        }

        return next();
    },

    createEquipment: function (req, res, next) {
        const equipment = req.body;


        const requiredFields = _hasManyExpectedKeys(keysExpectedFor.equipment, equipment);

        if (requiredFields != keysExpectedFor.equipment.length) {
            return res.status(400).send(
                getRequiredFieldsErrorResponse(keysExpectedFor.equipment, requiredFields)
            );
        }

        return next();
    },
}