const { checkToken } = require('../../utils/security');

const _getPermissionNameByRoute = (route = String) => {
    if (route === '/create') {
        return 'create';
    }
    if (route === '/all' || route.indexOf('/by_heritage') !== -1) {
        return 'read';
    }
    if (route === '/update') {
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
            return res.status(401).send({ error: 'token is null' });

        const [bearer, token] = authorization.split(' ');

        if (bearer !== 'Bearer')
            return res.status(401).send({ error: "expected gives bearer" });

        try {
            const userData = checkToken(token);
            req.userData = userData;
            req.permissions = userData.permissions
            next();

        } catch (error) {
            return res.status(401).send({ error: "invalid token" });
        }
    },

    hasPermission: function (req, res, next) {
        const current_route = req.url;

        const permissionName = _getPermissionNameByRoute(current_route);
        for (let i = 0; i < req.permissions.length; i++) {
            const permission = req.permissions[i];

            if (permission.name == permissionName) {
                return next();
            }
        }
        return res.status(401).send({ error: 'user has no permission' })
    },

}