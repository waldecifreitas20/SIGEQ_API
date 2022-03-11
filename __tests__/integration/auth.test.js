/* 

Register user:
    - Register user with success                        1
    - Attempt to register already existing user         1
    - Attempt to register user null or undefined

User authentication: 
    - Authenticate user with success
    - Authenticate attempt user with false password
    - Authenticate attempt user with false email

*/

const paths = require('../../src/utils/paths');
require('../../src/database/connection');

const { 
    database, 
    initModels, 
    syncDatabase 
} = require(paths.database);

const initDatabase = async () => {
    database.authenticate();
    initModels();
    await syncDatabase({force : true});
    await syncDatabase();
}

initDatabase();

describe('Register test', () => {

    const { generateUser } = require('../factory');    
    const services = require(paths.services.auth);    
    const newUser = generateUser();
    
    it('should register a new user in database', async () => {
        const response = await services.register(newUser);        
        expect(response.status).toBe(200);
    });
    
    it('should gives error trying to register an already registered user', async () => {
        const response = await services.register(newUser);  
        expect(response.status).toBe(400);
    });
    
    
    it('should to get status 400 on trying register null user', async () => {
        const response = await services.register(null);
        expect(response.status).toBe(400);
    });
});