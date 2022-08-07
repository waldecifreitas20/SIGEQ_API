const { resolve: getPath } = require('path');

const factory = require('../../factory');
const request = require('../../requestTester');
const { generateToken } = require(getPath('src', 'utils', 'security.js'));

const routes = require('../../routes').equipment;

const validToken = 'Bearer ' + generateToken({
    user: factory.generateUser(),
    permissions: factory.generatePermissions({}),
});
const tokenWithoutPermission = generateToken({ user: factory.generateUser() });


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

    it('should return error code 11002 when trying send a null body on create equipment request', async () => {
        const response = await request.post({
            route: routes.create,
            headers: { authorization: validToken }
        });
        expect(response.body.code).toBe('11002');
    });

    it('should return error code 12101 when trying create new equipment without token', async () => {
        const response = await request.post({
            route: routes.create,
            body: equipment,
        });
        expect(response.body.code).toBe('12101');
    });

    it('should return error code 12201 when trying create new equipment without permission', async () => {
        const response = await request.post({
            route: routes.create,
            body: factory.generateEquipment(),
            headers: { authorization: 'Bearer ' + tokenWithoutPermission }
        });

        expect(response.body.code).toBe('12201');
    });

    it('should return error code 23505 when trying create a equipment already exists', async () => {
        const response = await request.post({
            route: routes.create,
            body: equipment,
            headers: { authorization: validToken }
        });
        expect(response.body.code).toBe('23505');
    });

    it('should return error code 22P02 when trying to create an equipment with invalid manufacturer id', async () => {
        let invalidEquipment = factory.generateEquipment();

        invalidEquipment.manufacturerId = 'd';

        const response = await request.post({
            route: routes.create,
            body: invalidEquipment,
            headers: { authorization: validToken }
        });
        expect(response.body.code).toBe('22P02');
    });

    it('should return error code 23503 when trying to create an equipment with invalid manufacturer id', async () => {
        let invalidEquipment = factory.generateEquipment();

        invalidEquipment.manufacturerId = -1;

        const response = await request.post({
            route: routes.create,
            body: invalidEquipment,
            headers: { authorization: validToken }
        });
        expect(response.body.code).toBe('23503');
    });

    it('should return error code 22P02 when trying to create an equipment with invalid category id sent', async () => {
        let invalidEquipment = factory.generateEquipment();

        invalidEquipment.categoryId = 'a';

        const response = await request.post({
            route: routes.create,
            body: invalidEquipment,
            headers: { authorization: validToken }
        });
        expect(response.body.code).toBe('22P02');
    });

    it('should return error code 23503 when trying to create an equipment with nonexisting category id value', async () => {
        let invalidEquipment = factory.generateEquipment();

        invalidEquipment.categoryId = -1;

        const response = await request.post({
            route: routes.create,
            body: invalidEquipment,
            headers: { authorization: validToken }
        });
        expect(response.body.code).toBe('23503');
    });

    it('should return error code 22P02 when trying to create an equipment with invalid location id', async () => {
        let invalidEquipment = factory.generateEquipment();

        invalidEquipment.locationId = 'b';

        const response = await request.post({
            route: routes.create,
            body: invalidEquipment,
            headers: { authorization: validToken }
        });
        expect(response.body.code).toBe('22P02');
    });

    it('should return error code 23503 when trying to create an equipment with nonexisting location id', async () => {
        let invalidEquipment = factory.generateEquipment();

        invalidEquipment.locationId = -1;

        const response = await request.post({
            route: routes.create,
            body: invalidEquipment,
            headers: { authorization: validToken }
        });
        expect(response.body.code).toBe('23503');
    });

    it('should return error code 22P02 when trying to create an equipment with invalid status id', async () => {
        let invalidEquipment = factory.generateEquipment();

        invalidEquipment.statusId = 'c';

        const response = await request.post({
            route: routes.create,
            body: invalidEquipment,
            headers: { authorization: validToken }
        });
        expect(response.body.code).toBe('22P02');
    });

    it('should return error code 23503 when trying to create an equipment with nonexisting status id', async () => {
        let invalidEquipment = factory.generateEquipment();

        invalidEquipment.statusId = -1;

        const response = await request.post({
            route: routes.create,
            body: invalidEquipment,
            headers: { authorization: validToken }
        });
        expect(response.body.code).toBe('23503');
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

    it('should return error code 12202 ok when trying get all equipments without permission', async () => {
        const response = await request.get({
            route: routes.getAll,
            headers: { authorization: 'Bearer ' + tokenWithoutPermission }
        });
        expect(response.body.code).toBe('12202');
    });
});

describe('Search equipment test', () => {

    const equipment = factory.generateEquipment();

    /* it('should return 200 ok when trying get a equipment sending a id', async () => {
        const equip = await request.post({
            route: routes.create,
            headers: { authorization: validToken },
            body: equipment
        });
        console.log(equip.body);
        const response = await request.get({
            route: routes.search,
            headers: { authorization: validToken },
            body: {id : equip.body.equipment_id},
        });
        console.log(response.body);
        expect(response.status).toBe(200);
    }); */

    it('should return 400 when trying get a equipment without to send a id', async () => {

    });

    it('should return error code 12202 ok when trying get all equipments without permission', async () => {
        const response = await request.get({
            route: routes.getAll,
            headers: { authorization: 'Bearer ' + tokenWithoutPermission }
        });
        expect(response.body.code).toBe('12202');
    });
});

const _generateValidEquipmentId = async () => {
    const { body: response } = await request.post({
        route: routes.create,
        headers: { authorization: validToken },
        body: factory.generateEquipment()
    });
    return response.equipment_id;
}

/* describe('Delete equipment test', () => {

    it('should return 200 ok when trying delete a equipment', async () => {

    });

    it('should return 401 when trying delete a equipment without permission', async () => {

    });
});


describe('Update equipment test', () => { }); */