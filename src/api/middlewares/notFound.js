const { getErrorResponse } = require("../../utils/errors");
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

const deleteRoute = '/equipment/delete/';


const _isKnownRoute = route => _isRouteWithoutParams(route) || _hasValidParams(route);

const _isRouteWithoutParams = route => _routesWithoutParams.indexOf(route) !== -1;

const _hasValidParams = route => {
    let params = _getDeleteRouteParams(route);

    if (!params || parseInt(params) != params) {
        return false;
    }
    return true;
}

const _getDeleteRouteParams = route => {
    const isDeleteRoute = route.indexOf(deleteRoute) !== -1;
    if (isDeleteRoute) {
        return route.replace(deleteRoute, '');
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
            error: 'Endpoint does not exist',
        }));

    }
    if (!_isValidHttpMethod(CURRENT_ROUTE, HTTP_METHOD)) {
        return res.status(405).send(getErrorResponse({
            status: 405,
            error: 'Invalid method to this request',
        }));
    }

    return next();
}