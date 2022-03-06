const bcrypt = require('bcryptjs');
const paths = require('../../src/utils/paths');
require('../../src/database/connection');

const database = require(paths.database);
database.database.authenticate();
database.initModels();
database.syncDatabase();

describe('bcrypt test', () => {
    const fakePassword = '159731';
    const hash = bcrypt.hashSync(fakePassword, 10);

    it('should generate a hash', () => {
      
        expect(hash.length > 0).toBe(true);
    });
    
    it('should compare hash that returns true', async () => {
        const isEquals = await bcrypt.compare(fakePassword, hash);

        expect(isEquals).toBe(true);
    });

    it('should compare hash that returns true', async () => {
        const wrongPassword = '5987';
        const isEquals = await bcrypt.compare(wrongPassword, hash);

        expect(isEquals).toBe(false);
    });
});

describe('Authenticate test', () => {
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
});