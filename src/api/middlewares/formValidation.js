const _hasManyExpectedKeys = (keysExpected = [], object = {}) => {
    let missingFields = keysExpected;

    for (let i = 0; i < keysExpected.length; i++) {
        const key = keysExpected[i];
        if (object.hasOwnProperty(key)) {
            missingFields.splice(i, 1);
        }
    }

    return missingFields;
};



const _getMissingFieldsErrorResponse = (expected = [], received = [], missing = []) => {
    return {
        status: 400,
        error: true,
        title: 'Missing required fields',
        decription: `Were expected ${expected.length} required fields, but was given ${received.length}`,
        missing_fields: missing,
    };
}

module.exports = {

    register: function (req, res, next) {
        const user = req.body;
        let keysExpected = [
            'first_name',
            'surname',
            'email',
            'password',
            'cpf',
        ];

        let missingFields = _hasManyExpectedKeys(keysExpected, user);

        if (missingFields.length != keysExpected.length)
            return res.status(400).send(_getMissingFieldsErrorResponse(keysExpected, missingFields, missingFields));
        return next();
    },

    login: function (req, res, next) {
        const user = req.body;
        const keysExpected = ['email', 'password'];
        const missingFields = _hasManyExpectedKeys(keysExpected, user);

        if (missingFields.length != keysExpected.length)
            return res.status(400).send(_getMissingFieldsErrorResponse(keysExpected, missingFields, missingFields));

        return next();
    },

    equipment: function (req, res, next) {
        const equipment = req.body;
        const keysExpected = [
            "title", "company", "category",
            "model", "current_location", "status",
        ];

        const missingFields = _hasManyExpectedKeys(keysExpected, equipment);

        if (missingFields.length != keysExpected.length) {
            return res.status(400).send(_getMissingFieldsErrorResponse(keysExpected, missingFields));
        }
        return next();
    },

    checkFields: function (req, res, next) {
        const equipmentId = req.params.id;
        return next();
    }
};