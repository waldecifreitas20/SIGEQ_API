module.exports = {
    getErrorResponse: function ({
        error = String,
        status = 400,
        description = undefined,
        details = undefined,
    }) {

        return { status, error, description, details };
    }
}