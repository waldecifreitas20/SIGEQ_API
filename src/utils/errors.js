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

    getErrorDescription: function (error) {
        const errorCode = error.parent.code;
        
        switch (errorCode) {
            case '22P02':
                return 'invalid value of field sent. Check params';
            case '23503':
                return 'id sent does not exist. Check params';
            case '23505':
               return 'object have been existing into database';
            default:
                break;
        }
    }

}
