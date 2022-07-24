const { resolve: getPath } = require('path');

const factory = require('../../factory');
const request = require('./requestTester');
const { generateToken } = require(getPath('src', 'utils', 'security.js'));

const routes = {
    create: '/equipment/create',
    getAll: '/equipment/all',
    search: `/equipment/search`,
    update: '/equipment/update',
    delete: (id) => `/equipment/delete/${id}`
}
const validToken = 'Bearer ' + generateToken({
    user: factory.generateUser(),
    permissions: factory.generatePermissions({}),
});


describe('Equipment form validation test', () => {

    it('should return 400 when trying send a null body on create equipment request', async () => {
        const response = await request.post({
            route: routes.create,
            headers: { authorization: validToken }
        });
        expect(response.status == 400).toBe(true);
    });

    it('should return 400 when trying send a null body on update equipment request', async () => {
        const response = await request.put({
            route: routes.update,
            headers: { authorization: validToken }
        });
        expect(response.status).toBe(400);
    });
});

describe('Create equipment test', () => {
    const equipment = factory.generateEquipment();

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

    it('should return error code 22P02 when trying to create an equipment with invalid values of foreign keys', async () => {
        let invalidEquipment = factory.generateEquipment();

        invalidEquipment.categoryId = 'a';
        invalidEquipment.locationId = 'b';
        invalidEquipment.statusId = 'c';
        invalidEquipment.manufacturerId = 'd';

        const response = await request.post({
            route: routes.create,
            body: invalidEquipment,
            headers: { authorization: validToken }
        });
        expect(response.body.code).toBe('22P02');

        
    });
});

describe('Search equipment test', () => {

    it('should return 200 ok when trying get a equipment sending a id', async () => {

    });

    it('should return 400 when trying get a equipment without to send a id', async () => {

    });
});


describe('Get all equipment test', () => {

    it('should return status 200 ok when trying get all equipments', async () => {
        const response = await request.get({
            route: routes.getAll,
            headers: { authorization: validToken }
        });
        expect(response.status).toBe(200);
    });
});


describe('Delete equipment test', () => {

    it('should return 200 ok when trying delete a equipment', async () => {

    });

    it('should return 401 when trying delete a equipment without permission', async () => {

    });
});


describe('Update equipment test', () => { });