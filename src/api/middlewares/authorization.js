const { getErrorResponse } = require('../../utils/errors');
const { checkToken } = require('../../utils/security');

const _getPermissionRequiredByRoute = (route = String) => {
    if (route.indexOf('/create') !== -1) {
        return 'create';
    }
    if (route.indexOf('/all') !== -1 || route.indexOf('/search') !== -1) {
        return 'read';
    }
    if (route.indexOf('/update') !== -1) {
        return 'update';
    }
    if (route.indexOf('/delete') !== -1) {
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
            req.userData = userData;
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

        const permissionRequired = _getPermissionRequiredByRoute(current_route);
        for (let i = 0; i < req.permissions.length; i++) {
            const permission = req.permissions[i];

            if (permission.name == permissionRequired) {
                return next();
            }
        }
        return res.status(403).send(getErrorResponse({
            status: 403,
            error: 'user has no permissio',
            description: 'needs to have permission to request it'
        }))
    },

}