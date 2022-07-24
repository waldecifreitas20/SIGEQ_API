const { getErrorResponse, ERROR_CODE } = require("../../utils/errors");
const { ROUTES } = require("../../utils/shorts");

const _routesWithoutParams = [
    '/auth/register',
    '/auth/authenticate',
    '/auth/check_token',
    '/auth/recovery_password',

    '/equipment/all',
    '/equipment/search',
    '/equipment/create',
    '/equipment/update',
]

const _routesWithParams = ['/equipment/delete/'];

const _isKnownRoute = route => _isRouteWithoutParams(route) || _hasValidParams(route);
const _isRouteWithoutParams = route => _routesWithoutParams.indexOf(route) !== -1;

const _hasValidParams = route => {
    const params = _getParamsFromRoute(route);
    const isNumber = parseInt(params) == params;
    const isNull = params == undefined;

    if (!isNull && isNumber) {
        return true;
    }
    return false;
}


const _getParamsFromRoute = route => {
    for (let i = 0; i < _routesWithParams.length; i++) {
        let routeWithParams = _routesWithParams[i];
        let hasParams = route.indexOf(routeWithParams) !== -1;
        if (hasParams) {
            return route.replace(routeWithParams, '');
        }
    }
    return false;
}

const _isValidHttpMethod = (route, method) => {
    const routesByMethod = ROUTES[method];

    for (let i = 0; i < routesByMethod.length; i++) {
        const _route = routesByMethod[i];
        if (route.indexOf(_route) !== -1) {
            return true;
        }
    }
    return false;
}

module.exports = (req, res, next) => {
    const CURRENT_ROUTE = req.url;
    const HTTP_METHOD = req.method;

    if (!_isKnownRoute(CURRENT_ROUTE)) {
        return res.status(404).send(getErrorResponse({
            status: 404,
            code: ERROR_CODE.REQUEST.INVALID_ENDPOINT,
            error: 'Endpoint does not exist',
        }));

    }
    if (!_isValidHttpMethod(CURRENT_ROUTE, HTTP_METHOD)) {
        return res.status(405).send(getErrorResponse({
            status: 405,
            code: ERROR_CODE.REQUEST.INVALID_HTTP_METHOD,
            error: 'Invalid method to this request',
        }));
    }

    return next();
}