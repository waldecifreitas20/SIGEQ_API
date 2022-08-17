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

    it('should return 200 ok when trying to get a equipment sending a id', async () => {
        const id = await _generateEquipmentId();
        const response = await request.post({
            route: routes.search,
            headers: { authorization: validToken },
            body: { id, },
        });
        expect(response.status).toBe(200);
    });

    it('should return 200 ok when trying to get a equipment sending all fields', async () => {
        const equipment = factory.generateEquipment();
        await _registerEquipment(equipment);

        const response = await request.post({
            route: routes.search,
            headers: { authorization: validToken },
            body: equipment,
        });

        expect(response.status).toBe(200);
    });


    it('should return error code 22P02 when trying to search a invalid id value', async () => {
        const response = await request.post({
            route: routes.search,
            headers: { authorization: validToken },
            body: { id: "a" },
        });

        expect(response.body.code).toBe('22P02');
    });

    it('should return error code 11001 when trying to search a not registered equipment', async () => {
        const response = await request.post({
            route: routes.search,
            headers: { authorization: validToken },
            body: { id: -1 },
        });

        expect(response.body.code).toBe('11001');
    });

});

const _generateEquipmentId = async () => {
    const { body: response } = await request.post({
        route: routes.create,
        headers: { authorization: validToken },
        body: factory.generateEquipment()
    });
    return response.equipment_id;
}

const _registerEquipment = async equipment => {
    const { body: response } = await request.post({
        route: routes.create,
        headers: { authorization: validToken },
        body: equipment,
    });
    return response.equipment_id;
}

describe('Get all equipments test', () => {

    it('should return status 200 when trying to get all equipments with valid token', async () => {
        const response = await request.get({
            route: routes.getAll,
            headers: { authorization: validToken }
        });
        expect(response.status).toBe(200);
    });

    it('should return error code 12202 when trying to get all equipments without permission', async () => {
        const response = await request.get({
            route: routes.getAll,
            headers: { authorization: 'Bearer ' + tokenWithoutPermission }
        });
        expect(response.body.code).toBe('12202');
    });

    it('should return error code 13102 when trying to reach the route with a invalid http method', async () => {
        const response = await request.post({
            route: routes.getAll,
            headers: { authorization: validToken }
        });
        expect(response.body.code).toBe('13102');
    });

});

describe('Delete equipment test', () => {

    it('should return 204 when trying delete a equipment', async () => {
        const id = await _generateEquipmentId();
        const response = await request.delete({
            route: routes.delete(id),
            headers: { authorization: validToken }
        });
        expect(response.status).toBe(204);
    });

    it('should return error code 13101 when trying to delete a equipment with a noninteger id value', async () => {
        const response = await request.delete({
            route: routes.delete('a'),
            headers: { authorization: validToken }
        });
        expect(response.body.code).toBe('13101');

    });

    it('should return erro code 11001 when trying to delete a nonexisting equipment', async () => {
        const response = await request.delete({
            route: routes.delete(-1),
            headers: { authorization: validToken }
        });
        expect(response.body.code).toBe('11001');
    });

    it('should return erro code 12204 when trying to delete a equipment without permission', async () => {
        const response = await request.delete({
            route: routes.delete(1),
            headers: { authorization: 'Bearer ' + tokenWithoutPermission }
        });
        expect(response.body.code).toBe('12204');
    });

    it('should return erro code 13102 when trying to reach the route with a invalid http method', async () => {
        const response = await request.post({
            route: routes.delete(-1),
            headers: { authorization: 'Bearer ' + tokenWithoutPermission }
        });
        expect(response.body.code).toBe('13102');
    });

    it('should return erro code 13101 when trying to reach the route sending no id', async () => {
        const response = await request.post({
            route: routes.delete(),
            headers: { authorization: 'Bearer ' + validToken }
        });
        expect(response.body.code).toBe('13101');
    });
});


describe('Update equipment test', () => {

    it('should return status 200 when trying to update an equipment', async () => {
        const equipment = factory.generateEquipment();
        const id = await _registerEquipment(equipment);
        
        equipment.id = id;        
        
        const response = await request.put({
            route: routes.update,
            headers: { authorization: validToken },
            body: equipment,
        });
        expect(response.status).toBe(204);
    });
    
    it('should return 11004 when trying to update an equipment sending no id', async () => {
        const response = await request.put({
            route: routes.update,
            headers: { authorization: validToken },
            body: factory.generateEquipment(),
        });
        expect(response.body.code).toBe('11004');
    });
   
    it('should return 11001 when trying to update a not registered equipment', async () => {
        const response = await request.put({
            route: routes.update,
            headers: { authorization: validToken },
            body: {id : -1},
        });
        expect(response.body.code).toBe('11001');
    });
    
    it('should return 22P02 when trying to update an equipment sending a noninteger id', async () => {
        const response = await request.put({
            route: routes.update,
            headers: { authorization: validToken },
            body: {id : '%a'},
        });
        expect(response.body.code).toBe('22P02');
    });
    
    it('should return 22P02 when trying to update an equipment sending a blank space as id', async () => {
        const response = await request.put({
            route: routes.update,
            headers: { authorization: validToken },
            body: {id : '                                    '},
        });
        expect(response.body.code).toBe('22P02');
    });
    
    it('should return 22003 when trying to update an equipment sending a blank space as id', async () => {
        const response = await request.put({
            route: routes.update,
            headers: { authorization: validToken },
            body: {id : '564664656664664646464646464646465654646556165116546546451651654654516565465451654654616545646416546'},
        });
        
        expect(response.body.code).toBe('22003');
    });
});