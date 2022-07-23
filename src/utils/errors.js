module.exports = {
    getErrorResponse: function ({
        error = String,
        status = 400,
        description = undefined,
        details = undefined,
    }) {

        return { status, error, description, details };
    },

    getRequiredFieldsError: function (expected = [], received = Number) {
        return {
            status: 400,
            error: 'Missing required fields',
            description: `Were expected ${expected.length} required fields, but were given ${received}`,
            details: {
                required_fields: expected,
            },
        };
    },

    getErrorCode: function (error) {
        return typeof error == 'string'? error: error.parent.code;
    },

    getErrorDescription: function (error) {
        switch (error) {
            case '10001':
                return 'equipment might be not registered yet';
            case '22P02':
                return 'request body has one or more fields with invalid values';
            case '23503':
                return 'id sent does not exist. Check statusId, manufacturerId, categoryId, locationId and try again';
            case '23505':
                return 'it has been existing into the database';
            default:
                break;
        }
    }

}
