const { ERROR_CODE, getErrorResponse } = require("../../utils/errors");

module.exports = function (req, res, next) {
    const url = req.url;
    return res.status(404).send(getErrorResponse({
        status: 404,
        code: ERROR_CODE.REQUEST.INVALID_ENDPOINT,
        error: 'URL not found',
        details: `The requested URL ${url} does not exist`
    }));
}