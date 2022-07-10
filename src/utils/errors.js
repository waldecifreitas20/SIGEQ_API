module.exports = {
    getErrorResponse: function ({
        error = String,
        status = 400,
        description = undefined,
        details = undefined,
    }) {

        return { status, error, description, details };
    },

    getRequiredFieldsErrorResponse: function (expected = [], received = Number) {
    return {
        status: 400,
        error: 'Missing required fields',
        description: `Were expected ${expected.length} required fields, but were given ${received}`,
        details: {
            required_fields: expected,
        },
    };
}
}