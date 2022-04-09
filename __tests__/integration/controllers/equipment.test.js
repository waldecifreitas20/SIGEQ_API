const { resolve: getPath } = require('path');

const factory = require('../../factory');
const request = require('./requestTester');
const { generateToken } = require(getPath('src', 'utils', 'security.js'));

const routes = {
    create: '/equipment/create',
    getAll: '/equipment/all',
    getByHeritage: (heritage) => `/equipment/by_heritage/${heritage}`,
    update: '/equipment/update',
    delete: (id) => `/equipment/delete/${id}`
}

describe('Create equipment test', () => {
    const equipment = factory.generateEquipment();
    const validToken = 'Bearer ' + generateToken({
        user: factory.generateUser(),
        permissions: factory.generatePermissions({}),
    });

    it('should return status 200 OK when trying create new equipment into the database', async () => {
        const response = await request.post({
            route: routes.create,
            body: equipment,
            headers: { authorization: validToken }
        });
        expect(response.status).toBe(200);
    });

    it('should return status 401 when trying create new equipment without token', async () => {
        const response = await request.post({
            route: routes.create,
            body: equipment,
        });
        expect(response.status).toBe(401);
    });

    it('should return status 401 when trying create new equipment without permission', async () => {
        const tokenHasNoPermission = generateToken(factory.generateUser());
        const response = await request.post({
            route: routes.create,
            body: equipment,
            headers: { authorization: tokenHasNoPermission }
        });
        expect(response.status).toBe(401);
    });

    it('should return status 400 when trying create a equipment already exists', async () => {
        const response = await request.post({
            route: routes.create,
            body: equipment,
            headers: { authorization: validToken }
        });
        expect(response.status).toBe(400);
    });
});

describe('Delete equipment test', () => { });
describe('Get by heritage equipment test', () => { });
describe('Get all equipment test', () => { });
describe('Update equipment test', () => { });