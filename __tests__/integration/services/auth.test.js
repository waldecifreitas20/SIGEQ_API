const paths = require('../../../src/utils/paths');

const { generateUser } = require('../../factory');
const services = require(paths.services.auth);

require('./syncDB');

describe('Register test', () => {

    const newUser = generateUser();

    it('should register a new user in database', async () => {
        const response = await services.register(newUser);
        expect(response.status).toBe(200);
    });

    it('should give error when trying to register an already registered user', async () => {
        const response = await services.register(newUser);
        expect(response.status).toBe(400);
    });

    it('should get status 400 when trying to register a user as null', async () => {
        const response = await services.register(null);
        expect(response.status).toBe(400);
    });

    it('should get status 400 when trying to register a user with fields too long', async () => {
        const userTooLong = generateUser();
        userTooLong.firstName = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
        const response = await services.register(userTooLong);
        expect(response.status).toBe(400);
    });

});


describe('Authenticate test', () => {

    const user = generateUser();

    it('should authenticate a user with sucess', async () => {
        await services.register(user);
        const response = await services.login(user.email, user.password);
        expect(response.status).toBe(200);
    });

    it('should get status code 401 when trying to authenticate an user without body', async () => {
        const response = await services.login(null, null);
        expect(response.status).toBe(401);
    });

    it('should get status code 401 when trying to authenticate an user with invalid email', async () => {
        const response = await services.login('invalid email', user.password);
        expect(response.status).toBe(401);
    });

    it('should get status code 401 when trying to authenticate an user with invalid password', async () => {
        const response = await services.login(user.email, 'invalid pass');
        expect(response.status).toBe(401);
    });

    it('should get status code 401 when trying to authenticate an user with both credentials invalids', async () => {
        const response = await services.login('invalid', 'invalid');
        expect(response.status).toBe(401);
    });
   
    it('should get status code 401 when trying to authenticate using a non-json format', async () => {
        const response = await services.login(1, 1);
        expect(response.status).toBe(401);
    });

});