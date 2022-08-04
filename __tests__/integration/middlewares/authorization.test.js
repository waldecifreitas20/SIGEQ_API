const request = require('../../requestTester');
const route = require('../../routes').equipment.getAll;
const factory = require('../../factory');
const { generateToken } = require('../../../src/utils/security.js');

describe('Check Token', () => {

    it('should return error code 12101 when trying to reach a route of equipments without token', async () => {
        const response = await request.get({
            route,
        });
        expect(response.body.code).toBe('12101');
    });
    
    it('should return error code 12102 when trying to reach a route of equipments with token having no Bearer', async () => {
        const tokenWithoutBearer = 'd1g5ts6s4rg4ef6tg5t';
        const response = await request.get({
            route,
            headers: {authorization : tokenWithoutBearer}
        });
        expect(response.body.code).toBe('12102');
    });

    it('should return error code 12103 when trying to reach a route of equipments with token having no Bearer', async () => {
        const invalidToken = 'Bearer d1g5ts6s4rg4ef6tg5t';
        const response = await request.get({
            route,
            headers: {authorization : invalidToken}
        });
        expect(response.body.code).toBe('12103');
    });
   
    it('should return error code 12103 when trying to reach a route of equipments with dirty token', async () => {
        const dirtyToken = 'Bearer e' + generateToken({user: factory.generateUser()});
        const response = await request.get({
            route,
            headers: {authorization : dirtyToken}
        });
        expect(response.body.code).toBe('12103');
    });
});