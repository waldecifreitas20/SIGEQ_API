module.exports = {
    exception: function (message = String, errorCode = 400) {
        return { message, errorCode };
    },

    getErrorResponse: function (error) {
        return {
            status: error.errorCode,
            error: error.message,
        };
    }


}