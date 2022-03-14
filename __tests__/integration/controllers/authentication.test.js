const request = require('supertest');

const app = require('../../../src/app');
const { generateUser } = require('../../factory');

const routes = {
    register : '/auth/register',
    authenticate : '/auth/authenticate',
    checkToken : '/auth/check_token'
}

const postRequest = async (route, data={}) => {
    return await request(app)
        .post(route)
        .send(data);
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

});


