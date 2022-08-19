describe('Database connection test', () => {
    const connect = require('../../../src/database/connection');

    it('should get 0 as response', async () => {
        const response = await connect();
        expect(response).toBe(0);
    })
});