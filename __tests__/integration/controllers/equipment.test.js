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
        expect(response.status).toBe(400);
    });
    
    it('should return 400 when trying send a null body on update equipment request', async () => {
        const response = await request.post({
            route: routes.update,
            headers: { authorization: validToken }
        });
        console.log(response);
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
});

describe('Get by heritage equipment test', () => { });

describe('Get all equipment test', () => {

    it('should return status 200 ok when trying get all equipments', async () => {
        const response = await request.get({
            route: routes.getAll,
            headers: { authorization: validToken }
        });
        expect(response.status).toBe(200);
    });
});

const getEquipmentIdFromDatabase = async () => {
    const response = await request.get({
        route: routes.getAll,
        headers: { authorization: validToken }
    });

    return response.body.equipment[0].id;
}

describe('Delete equipment test', () => {

    it('should return 200 ok when trying delete a equipment', async () => {
        const equipmentId = await getEquipmentIdFromDatabase();
        const response = await request.delete({
            route: routes.delete(equipmentId),
            headers: { authorization: validToken }
        });

        expect(response.status).toBe(200);
    });

    it('should return 401 when trying delete a equipment without permission', async () => {
        const tokenWithoutDeletePermission = generateToken({
            user: factory.generateUser(),
            permissions: factory.generatePermissions({ remove: false })
        });

        const equipmentId = await getEquipmentIdFromDatabase();
        const response = await request.delete({
            route: routes.delete(equipmentId),
            headers: { authorization: tokenWithoutDeletePermission }
        });

        expect(response.status).toBe(401);
    });
});


describe('Update equipment test', () => { });