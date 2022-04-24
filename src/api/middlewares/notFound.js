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

const _routesWithParams = ['/equipment/delete/', '/equipment/search/'];


const _isValidRoute = (route) => {
    if (_isRouteWithoutParams(route)) {
        return true;
    } else {
        let params = _getParamsFromRoute(route);
        if (!params || parseInt(params) != params) {
            return false;
        }
        return true;
    }
}

const _isRouteWithoutParams = route => _routesWithoutParams.indexOf(route) !== -1;

const _getParamsFromRoute = route => {
    for (let i = 0; i < _routesWithParams.length; i++) {
        if (route.indexOf(_routesWithParams[i]) !== -1) {
            return route.replace(_routesWithParams[i], '');
        }
    }
    return false;
}


module.exports = (req, res, next) => {
    const route = req.url;

    if (_isValidRoute(route)) {
        return next();
    }
    return res.status(404).send(getErrorResponse({
        status: 404,
        error: 'Endpoint does not exist',
    }));
}