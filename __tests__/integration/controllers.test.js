const request = require('supertest');
const app = require('../../src/app');

describe('Auth controller test', () => {
    const { generateUser } = require('../factory');
    it('should try register a new user', async () => {
        const user = generateUser();
        const response = await request(app)
        .post('/auth/register').send(user);

        console.log(response);

        expect(response.status).toBe(200);
    });
});