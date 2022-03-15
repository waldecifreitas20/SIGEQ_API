const request = require('supertest');
const { resolve : getPath } = require('path');
const app = require(getPath('src', 'app'));
const { generateUser } = require('../../factory');

const routes = {
    register : '/auth/register',
    authenticate : '/auth/authenticate',
    checkToken : '/auth/check_token'
}

const postRequest = async (route, data={}, token='') => {
    return await request(app)
        .post(route)
        .send(data).set({authorization : token});
};

const user = generateUser();

describe('Register test', () => {
    
    it('should register a new user and it returns status 200 OK', async () => {
        const response = await postRequest(routes.register, user);
        expect(response.status).toBe(200);
    });
    
    it('should return an error on try to register an user without body', async () => {
        const response = await postRequest(routes.register);       
        expect(response.status).toBe(400);
    });

    it('should return an error when trying to register an user without required params', async () => {
        const response = await postRequest(routes.register, {full_name : 'junior'});
        expect(response.status).toBe(400);
    });

});

describe('Authenticate test', () => {

    it('should authenticate an user with success', async () => {
        const response = await postRequest(routes.authenticate, user);
        expect(response.status).toBe(200);
    });
    
    it('should return an error when trying to authenticate an user without body', async () => {
        const response = await postRequest(routes.authenticate);
        expect(response.status).toBe(400);
    });

    it('should return an error when trying to authenticate an user with invalid email', async () => {
        const response = await postRequest(routes.authenticate, {
            email : 'noEmailAvailable', 
            password : user.password
        });
        expect(response.status).toBe(401);
    });
    
    it('should return an error when trying to authenticate an user with invalid password', async () => {
        const response = await postRequest(routes.authenticate, {
            email : user.email, 
            password : '1'
        });
        expect(response.status).toBe(401);
    });

});


describe('Check token test', () => {
    const { generateToken } = require(getPath('src/utils/security'));
   
    it('should return status 200 OK when token is valid', async () => {
        const token = 'Bearer ' + generateToken(generateUser());
        const response = await postRequest(routes.checkToken, 'nobody', token);
        expect(response.status).toBe(200);
    });


    it('should return an status code 401 when the token sent to be invalid', async () => {
        const falseToken = 'Bearer 566a5s4dsdasdasd';
        const response = await postRequest(routes.checkToken, 'nobody', falseToken);
        expect(response.status).toBe(401);
    });
    
    it('should return an status code 401 when the no token to be sent', async () => {
        const response = await postRequest(routes.checkToken);
        expect(response.status).toBe(401);
    });
    it('should return an status code 401 when the token sent have not bearer', async () => {
        const withoutBearerToken = generateToken(generateUser());
        const response = await postRequest(routes.checkToken, 'nobody', withoutBearerToken);
        expect(response.status).toBe(401);
    });

});


