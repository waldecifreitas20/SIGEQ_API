const knownRoutes = [
    '/auth/register',
    '/auth/authenticate',
    '/auth/check_token',

    '/equipment/all',
    '/equipment/search/',
    '/equipment/create',
    '/equipment/delete/',
    '/equipment/update',
]


module.exports = (req, res, next) => {
    const route = req.url;
    const isKnownRoute = knownRoutes.indexOf(route) !== -1;
    
    if (isKnownRoute) {
        return next();
    }
    return res.status(404).send({ error: "endpoint does not exist" })
}