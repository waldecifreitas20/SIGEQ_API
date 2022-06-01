const { getErrorResponse } = require("../../utils/errors");

const _hasManyExpectedKeys = (keysExpected = [], object = {}) => {
    let requiredFields = 0;

    for (let i = 0; i < keysExpected.length; i++) {
        const key = keysExpected[i];
        if (object.hasOwnProperty(key)) {
            requiredFields++;
        }
    }
    return requiredFields;
};

const _getrequiredFieldsErrorResponse = (expected = [], received = Number) => {
    return getErrorResponse({
        status: 400,
        error: 'Missing required fields',
        description: `Were expected ${expected.length} required fields, but were given ${received}`,
        details: {
            expected_fields: expected,
        },
    });
}

module.exports = {

    register: function (req, res, next) {
        const user = req.body;
        let keysExpected = [
            'first_name', 'surname',
            'email', 'password', 'cpf',
        ];

        let requiredFields = _hasManyExpectedKeys(keysExpected, user);

        if (requiredFields != keysExpected.length) {
            return res.status(400).send(
                _getrequiredFieldsErrorResponse(keysExpected, requiredFields)
            );
        }
        return next();
    },

    login: function (req, res, next) {
        const user = req.body;
        const keysExpected = ['email', 'password'];

        const requiredFields = _hasManyExpectedKeys(keysExpected, user);

        if (requiredFields != keysExpected.length) {
            return res.status(400).send(
                _getrequiredFieldsErrorResponse(keysExpected, requiredFields)
            );
        }

        return next();
    },

    createEquipment: function (req, res, next) {
        const equipment = req.body;
        const keysExpected = [
            "title",
        ];
        /* 
            "model", "category_id",
            "manufacturer_id", "progepSector_id", "status_id"
        */

        const requiredFields = _hasManyExpectedKeys(keysExpected, equipment);

        if (requiredFields != keysExpected.length) {
            return res.status(400).send(
                _getrequiredFieldsErrorResponse(keysExpected, requiredFields)
            );
        }

        return next();
    },
}