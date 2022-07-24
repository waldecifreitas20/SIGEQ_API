const paths = require('../../../src/utils/paths');

const { generateUser } = require('../../factory');
const services = require(paths.services.auth);

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
});


describe('Authenticate test', () => {

});