const { getErrorResponse, ERROR_CODE } = require('../../utils/errors');
const { checkToken } = require('../../utils/security');

const _isSubRouteOf = (route, subRoute) => route.indexOf(subRoute) !== -1;

const _getRequiredPermissionByRoute = (route = String) => {
    if (_isSubRouteOf(route, '/create')) {
        return 'create';
    }
    if (_isSubRouteOf(route, '/all') || _isSubRouteOf(route, '/search')) {
        return 'read';
    }
    if (_isSubRouteOf(route, '/update')) {
        return 'update';
    }
    if (_isSubRouteOf(route, '/delete')) {
        return 'delete';
    }
}

module.exports = {
    checkToken: function (req, res, next) {
        const authorization = req.headers.authorization;
        if (authorization === undefined)
            return res.status(401).send(getErrorResponse({
                status: 401,
                code: ERROR_CODE.USER.TOKEN.IS_NULL,
                error: 'token is null'
            }));

        const [bearer, token] = authorization.split(' ');

        if (bearer !== 'Bearer')
            return res.status(401).send(getErrorResponse({
                status: 401,
                code: ERROR_CODE.USER.TOKEN.MISSING_BEARER,
                error: "expected gives bearer"
            }));

        try {
            const userData = checkToken(token);
            req.permissions = userData.permissions
            next();

        } catch (error) {
            return res.status(401).send(getErrorResponse({
                status: 401,
                code: ERROR_CODE.USER.TOKEN.INVALID_TOKEN,
                error: "invalid token"
            }));
        }
    },

    hasPermission: function (req, res, next) {
        const current_route = req.url;

        const permissionRequired = _getRequiredPermissionByRoute(current_route);
        try {
            for (let i = 0; i < req.permissions.length; i++) {

                const permission = req.permissions[i];

                if (permission.name == permissionRequired) {
                    return next();
                }
            }
            throw 'cannot find any permission';
        } catch (error) {
            return res.status(403).send(getErrorResponse({
                status: 403,
                code: ERROR_CODE.USER.PERMISSION[permissionRequired.toLocaleUpperCase()],
                error: 'user has no permission',
                description: 'it must have permission to request it'
            }));
        }
    },

}