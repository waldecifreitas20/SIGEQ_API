/* 

User authentication: 
    - Authenticate user with success
    - Authenticate attempt user with false password
    - Authenticate attempt user with false email

*/

const paths = require('../../../src/utils/paths');
require('../../../src/database/connection');

describe('Register test', () => {

    const { generateUser } = require('../../factory');    
    const services = require(paths.services.auth);    
    const newUser = generateUser();
    
    it('should register a new user in database', async () => {
        const response = await services.register(newUser);    
        expect(response.status).toBe(200);
    });
    
    it('should give error when trying to register an already registered user', async () => {
        const response = await services.register(newUser);  
        expect(response.status).toBe(400);
    });
    
    
    it('should to get status 400 on trying to register null user', async () => {
        const response = await services.register(null);
        expect(response.status).toBe(400);
    });
});