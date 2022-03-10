const { checkToken } = require('../../utils/security');

module.exports = {
    tokenVerify : (req, res, next) => {
        const authorization = req.headers.authorization;

        if (!authorization) 
            return res.status(401).send({error : 'token is null'});
        
        const [bearer, token] = authorization.split(' ');
        
        if (bearer !== 'Bearer') 
            return res.status(401).send({error : "expected gives bearer"});
        
        try {
            const userData = checkToken(token);
            req.userData = userData;

            next();

        } catch (error) {
            return res.status(401).send({error : "invalid token"});
        }
    },
    checkPermissions : (req, res, next) => {
        const permissions = req.body.permissions;

        if (!permissions || permissions.length === 0) 
            return res.status(401).send({ error : 'user has no permissions'})
        

        next();
    }  
}