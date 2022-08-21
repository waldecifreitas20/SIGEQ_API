const { getErrorResponse, ERROR_CODE } = require("../../utils/errors");
const { ROUTES } = require("../../utils/shorts");

module.exports = (req, res, next) => {
    const HAS_QUERY = !!req.query;
    let url = req.url;

    if (HAS_QUERY) {
        url = req.url.split('?')[0];
    }

    const IS_EXISTING = !!ROUTES[url];

    if (IS_EXISTING) {
        const IS_VALID_METHOD = ROUTES[url].method === req.method;
        if (!IS_VALID_METHOD) {
            return res.status(405).send(getErrorResponse({
                status: 405,
                code: ERROR_CODE.REQUEST.INVALID_HTTP_METHOD,
                error: 'Invalid HTTP method',
                details: `Cannot reach ${url} using ${req.method} method`
            }));
        }
    }
    
    next();

}