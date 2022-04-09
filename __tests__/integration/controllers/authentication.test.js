const { resolve: getPath } = require('path');
const { generateUser } = require('../../factory');
const requester = require('./requestTester');

const routes = {
    register: '/auth/register',
    authenticate: '/auth/authenticate',
    checkToken: '/auth/check_token'
}

const user = generateUser();

describe('Register test', () => {

    it('should register a new user and it returns status 200 OK', async () => {
        const response = await requester.post({
            route: routes.register,
            body: user
        });
  
        expect(response.status).toBe(200);
    });

    it('should return an error on try to register an user without body', async () => {
        const response = await requester.post({ route: routes.register });
        expect(response.status).toBe(400);
    });

    it('should return an error when trying to register an user without required params', async () => {
        const response = await requester.post({
            route: routes.register,
            body: { full_name: 'junior' }
        });
        expect(response.status).toBe(400);
    });

});

describe('Authenticate test', () => {

    it('should authenticate an user with success', async () => {
        const response = await requester.post({
            route: routes.authenticate,
            body: user
        });
        expect(response.status).toBe(200);
    });

    it('should return an error when trying to authenticate an user without body', async () => {
        const response = await requester.post({
            route: routes.authenticate,
        });
        expect(response.status).toBe(400);
    });

    it('should return an error when trying to authenticate an user with invalid email', async () => {
        const response = await requester.post({
            route: routes.authenticate,
            body: {
                email: 'noEmailAvailable',
                password: user.password
            }
        });
        expect(response.status).toBe(401);
    });

    it('should return an error when trying to authenticate an user with invalid password', async () => {
        const response = await requester.post({
            route: routes.authenticate,
            body: {
                email: user.email,
                password: '1'
            }
        });
        expect(response.status).toBe(401);
    });

});


describe('Check token test', () => {
    const { generateToken } = require(getPath('src/utils/security'));

    it('should return status 200 OK when token is valid', async () => {
        const token = 'Bearer ' + generateToken(generateUser());
        const response = await requester.post({
            route: routes.checkToken,
            headers: { authorization: token }
        });
        expect(response.status).toBe(200);
    });


    it('should return an status code 401 when the token sent to be invalid', async () => {
        const falseToken = 'Bearer 566a5s4dsdasdasd';
        const response = await requester.post({
            route: routes.checkToken,
            headers: { authorization: falseToken }
        });
        expect(response.status).toBe(401);
    });

    it('should return an status code 401 when the no token to be sent', async () => {
        const response = await requester.post({ route: routes.checkToken });
        expect(response.status).toBe(401);
    });
    it('should return an status code 401 when the token sent have not bearer', async () => {
        const withoutBearerToken = generateToken(generateUser());
        const response = await requester.post({
            route: routes.checkToken,
            headers: { authorization: withoutBearerToken }
        });
        expect(response.status).toBe(401);
    });

});


