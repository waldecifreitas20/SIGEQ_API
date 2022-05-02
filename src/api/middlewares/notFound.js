const { getErrorResponse } = require("../../utils/errors");

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

const _routes = {
    get: [
        '/equipment/search',
        '/equipment/all',
    ],
    post: [
        '/equipment/create',
        '/auth/register',
        '/auth/authenticate',
        '/auth/check_token',
        '/auth/recovery_password',
    ],
    delete: [
        '/equipment/delete/'
    ],
    put: [
        '/equipment/update'
    ],
}

const deleteRoute = '/equipment/delete/';


const _isValidRoute = route => _isRouteWithoutParams(route) || _hasValidParams(route);

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


module.exports = (req, res, next) => {
    const route = req.url;

    if (!_isValidRoute(route)) {
        return res.status(404).send(getErrorResponse({
            status: 404,
            error: 'Endpoint does not exist',
        }));

    }
    if (!_isValidHttpMethod(route)) {
        return res.status(404).send(getErrorResponse({
            status: 405,
            error: 'HTTP method is not allowed',
        }));
    }
    return next();
}