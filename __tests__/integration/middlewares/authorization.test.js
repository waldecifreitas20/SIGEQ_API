const request = require('../../requestTester');
const routes = require('../../routes').equipment;
const factory = require('../../factory');
const { generateToken } = require('../../../src/utils/security.js');;

describe('Check Token', () => {

    it('should return error code 12101 when trying to reach a route of equipments without token', async () => {
        const id = await factory.generateEquipmentId();
        const response = await request.get({
            route: routes.getAll(id),
        });
        expect(response.body.code).toBe('12101');
    });

    it('should return error code 12102 when trying to reach a route of equipments with token having no Bearer', async () => {
        const tokenWithoutBearer = 'd1g5ts6s4rg4ef6tg5t';
        const id = await factory.generateEquipmentId();
        const response = await request.get({
            route: routes.getAll(id),
            headers: { authorization: tokenWithoutBearer }
        });
        expect(response.body.code).toBe('12102');
    });

    it('should return error code 12103 when trying to reach a route of equipments with token having no Bearer', async () => {
        const invalidToken = 'Bearer d1g5ts6s4rg4ef6tg5t';
        const id = await factory.generateEquipmentId();
        const response = await request.get({
            route: routes.getAll(id),
            headers: { authorization: invalidToken }
        });
        expect(response.body.code).toBe('12103');
    });

    it('should return error code 12103 when trying to reach a route of equipments with dirty token', async () => {
        const dirtyToken = 'Bearer e' + generateToken({ user: factory.generateUser() });
        const id = await factory.generateEquipmentId();
        const response = await request.get({
            route: routes.getAll(id),
            headers: { authorization: dirtyToken }
        });
        expect(response.body.code).toBe('12103');
    });
});

describe('Has permission test', () => {

    const tokenWithoutPermissions = 'Bearer ' + generateToken({ user: factory.generateUser() });

    it('should return error code 12201 when trying to reach route for CREATE equipment', async () => {
        const response = await request.post({
            route: routes.create,
            headers: { authorization: tokenWithoutPermissions },
            body: factory.generateEquipment()
        });
        expect(response.body.code).toBe('12201');
    });

    it('should return error code 12202 when trying to reach route for GET ALL equipments', async () => {
        const id = await factory.generateEquipmentId(); 
        const response = await request.get({
            route: routes.getAll(id),
            headers: { authorization: tokenWithoutPermissions },
            body: factory.generateEquipment()
        });
        expect(response.body.code).toBe('12202');

    });

    it('should return error code 12202 when trying to reach route for SEARCH equipments', async () => {
        const response = await request.post({
            route: routes.search,
            headers: { authorization: tokenWithoutPermissions },
            body: factory.generateEquipment()
        });
        expect(response.body.code).toBe('12202');

    });

    it('should return error code 12203 when trying to reach route for UPDATE equipments', async () => {
        const response = await request.put({
            route: routes.update,
            headers: { authorization: tokenWithoutPermissions },
            body: { id: 1 }
        });
        expect(response.body.code).toBe('12203');

    });

    it('should return error code 12204 when trying to reach route for DELETE equipments', async () => {
        const response = await request.delete({
            route: routes.delete(1),
            headers: { authorization: tokenWithoutPermissions },
            body: factory.generateEquipment()
        });
        expect(response.body.code).toBe('12204');

    });
});