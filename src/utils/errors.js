const ERROR_CODE = {
    EQUIPMENT: {
        NOT_REGISTERED: '11001',
        MISSING_FIELDS: '11002',

    },
    USER: {
        TOKEN: {
            IS_NULL: '12101',
            MISSING_BEARER: '12102',
            INVALID_TOKEN: '12103',
        },
        PERMISSION: {
            CREATE: '12201',
            READ: '12202',
            UPDATE: '12203',
            DELETE: '12204'
        },
        AUTH : {
            INVALID_CREDENTIALS: '12301',
        }
    },
    REQUEST: {
        INVALID_ENDPOINT: '13101',
        INVALID_HTTP_METHOD: '13102',
        EMPTY_BODY: '13103'
    },
    SEQUELIZE: {
        INVALID_VALUE_SENT: '22P02',
        INVALID_ID_SENT: '23503',
        ALREADY_EXISTS: '23505',
    }

}

module.exports = {
    getErrorResponse: function ({
        code = String,
        error = String,
        status = 400,
        description = undefined,
        details = undefined,
    }) {

        return { status, code, error, description, details };
    },

    getRequiredFieldsError: function (expected = [], received = Number) {
        return {
            status: 400,
            code: ERROR_CODE.EQUIPMENT.MISSING_FIELDS,
            error: 'Missing required fields',
            description: `Were expected ${expected.length} required fields, but were given ${received}`,
            details: {
                required_fields: expected,
            },
        };
    },

    getErrorCode: function (error) {
        return typeof error == 'string' ? error : error.parent.code;
    },

    getErrorDescription: function (error) {
        switch (error) {
            case ERROR_CODE.EQUIPMENT.NOT_REGISTERED:
                return 'equipment might be not registered yet';
            case ERROR_CODE.SEQUELIZE.INVALID_VALUE_SENT:
                return 'request body has one or more fields with invalid values';
            case ERROR_CODE.SEQUELIZE.INVALID_ID_SENT:
                return 'id sent does not exist. Check statusId, manufacturerId, categoryId, locationId and try again';
            case ERROR_CODE.SEQUELIZE.ALREADY_EXISTS:
                return 'it has been existing into the database';
            default:
                break;
        }
    },

    ERROR_CODE,


}
