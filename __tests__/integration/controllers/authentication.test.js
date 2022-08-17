const { resolve: getPath } = require('path');
const { generateUser } = require('../../factory');
const request = require('../../requestTester');

const routes = require('../../routes').authentication


describe('Register test', () => {

    const user = generateUser();

    it('should register a new user and it returns status 200 OK', async () => {
        const response = await request.post({
            route: routes.register,
            body: user
        });
        expect(response.status).toBe(200);
    });

    it('should return status 400 when trying to register an user without body', async () => {
        const response = await request.post({ route: routes.register });
        
        expect(response.body.code).toBe('11002');
    });

    it('should return error code 11002 when trying to register an user without required params', async () => {
        const response = await request.post({
            route: routes.register,
            body: { full_name: 'aaaaaaaaaaaa' }
        });
        expect(response.body.code).toBe('11002');
    });
   
    it('should return error code 22001 when trying to register an user with fields too long', async () => {
        const user = generateUser();
        user.firstName = '555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555';
        const response = await request.post({
            route: routes.register,
            body: user
        });
        expect(response.body.code).toBe('22001');
    });

});


describe('Authenticate test', () => {

    const user = generateUser();

    it('should authenticate an user with success', async () => {
        await request.post({
            route: routes.register,
            body: user
        });
        const response = await request.post({
            route: routes.authenticate,
            body: user
        });

        expect(response.status).toBe(200);
    });

    it('should return error code 11002 when trying to authenticate an user without body', async () => {
        const response = await request.post({
            route: routes.authenticate,
        });
        expect(response.body.code).toBe('11002');
    });

    it('should return error code 12301 when trying to authenticate an user with invalid email', async () => {
        const response = await request.post({
            route: routes.authenticate,
            body: {
                email: 'noEmailAvailable',
                password: user.password
            }
        });
        expect(response.body.code).toBe('12301');
    });

    it('should return error code 12301 when trying to authenticate an user with invalid password', async () => {
        const response = await request.post({
            route: routes.authenticate,
            body: {
                email: user.email,
                password: '1'
            }
        });
        expect(response.body.code).toBe('12301');
    });
    
    it('should return error code 42883 when trying to authenticate an user with invalid password', async () => {
        const response = await request.post({
            route: routes.authenticate,
            body: {
                email: 1,
                password: 1
            }
        });
        expect(response.body.code).toBe('42883');
    });

});


describe('Check token test', () => {
    const { generateToken } = require(getPath('src/utils/security'));

    it('should return status 200 OK when token is valid', async () => {
        const token = 'Bearer ' + generateToken(generateUser());
        const response = await request.post({
            route: routes.checkToken,
            headers: { authorization: token }
        });
        expect(response.status).toBe(200);
    });


    it('should return an status code 401 when the token sent to be invalid', async () => {
        const invalidToken = 'Bearer 566a5s4dsdasdasd';
        const response = await request.post({
            route: routes.checkToken,
            headers: { authorization: invalidToken }
        });
        expect(response.status).toBe(401);
    });
    
    it('should return error code 12103 when the token sent to be invalid', async () => {
        const invalidToken = 'Bearer 566a5s4dsdasdasd';
        const response = await request.post({
            route: routes.checkToken,
            headers: { authorization: invalidToken }
        });
        expect(response.body.code).toBe('12103');
    });

    it('should return an status code 401 when the no token to be sent', async () => {
        const response = await request.post({ route: routes.checkToken });
        expect(response.status).toBe(401);
    });
    
    it('should return error code 12101 when the no token to be sent', async () => {
        const response = await request.post({ route: routes.checkToken });
        expect(response.body.code).toBe('12101');
    });

    it('should return an status code 401 when the token sent have not bearer', async () => {
        const withoutBearerToken = generateToken(generateUser());
        const response = await request.post({
            route: routes.checkToken,
            headers: { authorization: withoutBearerToken }
        });
        expect(response.status).toBe(401);
    });
   
    it('should return error code 12102 when the token sent have not bearer', async () => {
        const withoutBearerToken = generateToken(generateUser());
        const response = await request.post({
            route: routes.checkToken,
            headers: { authorization: withoutBearerToken }
        });
        expect(response.body.code).toBe('12102');
    });

});


