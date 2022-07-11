const { getErrorResponse } = require('../../utils/errors');
const { checkToken } = require('../../utils/security');

const _isSubRouteOf = (route, subRoute) => route.indexOf('/create') !== -1;

const _getRequiredPermissionByRoute = (route = String) => {
    if (_isSubRouteOf(route, '/create')) {
        return 'create';
    }
    if (_isSubRouteOf(route, '/all') || _isSubRouteOf(route, '/search')) {
        return 'read';
    }
    if (_isSubRouteOf(route,'/update')) {
        return 'update';
    }
    if (route.indexOf('/delete')) {
        return 'delete';
    }
}

module.exports = {
    checkToken: function (req, res, next) {
        const authorization = req.headers.authorization;
        if (authorization === undefined)
            return res.status(401).send(getErrorResponse({
                status: 401,
                error: 'token is null'
            }));

        const [bearer, token] = authorization.split(' ');

        if (bearer !== 'Bearer')
            return res.status(401).send(getErrorResponse({
                status: 401,
                error: "expected gives bearer"
            }));

        try {
            const userData = checkToken(token);
            req.permissions = userData.permissions
            next();

        } catch (error) {
            return res.status(401).send(getErrorResponse({
                status: 401,
                error: "invalid token"
            }));
        }
    },

    hasPermission: function (req, res, next) {
        const current_route = req.url;

        const permissionRequired = _getRequiredPermissionByRoute(current_route);
        for (let i = 0; i < req.permissions.length; i++) {
            const permission = req.permissions[i];

            if (permission.name == permissionRequired) {
                return next();
            }
        }
        return res.status(403).send(getErrorResponse({
            status: 403,
            error: 'user has no permissions',
            description: 'it must have permission to request it'
        }))
    },

}