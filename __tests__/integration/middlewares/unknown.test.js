const { resolve: getPath } = require('path');

const routes = require('../../routes');
const factory = require('../../factory');
const request = require('../../requestTester');
const { generateToken } = require(getPath('src', 'utils', 'security.js'));


const validToken = 'Bearer ' + generateToken({
    user: factory.generateUser(),
    permissions: factory.generatePermissions({})
});

describe('Unkown CREATE equipment routes test', () => {

    it('Should return error code 13101 when trying to reach: /equipment/createEquipment', async () => {
        const { body: response } = await request.post({
            route: '/equipment/createEquipment',
            headers: { authorization: validToken },
            body: factory.generateEquipment()
        });
        expect(response.code).toBe('13101');
    });

    it('Should return error code 13101 when trying to reach: /equipment/creaty', async () => {
        const { body: response } = await request.post({
            route: '/equipment/creaty',
            headers: { authorization: validToken },
            body: factory.generateEquipment()
        });
        expect(response.code).toBe('13101');
    });

    it('Should return error code 13101 when trying to reach: /equipement/create', async () => {
        const { body: response } = await request.post({
            route: '/equipement/create',
            headers: { authorization: validToken },
            body: factory.generateEquipment()
        });
        expect(response.code).toBe('13101');
    });

    it('Should return error code 13101 when trying to reach: //equipment/create', async () => {
        const { body: response } = await request.post({
            route: '//equipment/create',
            headers: { authorization: validToken },
            body: factory.generateEquipment()
        });
        expect(response.code).toBe('13101');
    });

    it('Should return error code 13101 when trying to reach: //equipment/create/0', async () => {
        const { body: response } = await request.post({
            route: '/equipment/create/0',
            headers: { authorization: validToken },
            body: factory.generateEquipment()
        });
        expect(response.code).toBe('13101');
    });
    it('Should return error code 13101 when trying to reach: /equip/create', async () => {
        const { body: response } = await request.post({
            route: '/equip/create',
            headers: { authorization: validToken },
            body: factory.generateEquipment()
        });
        expect(response.code).toBe('13101');
    });

});

describe('Unkown DELETE equipment routes test', () => {

    it('Should return error code 13101 when trying to reach: /equipment/delete', async () => {
        const { body: response } = await request.delete({
            route: '/equipment/delete',
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('11005');
    });

    it('Should return error code 13101 when trying to reach: /equipment/delete/a', async () => {
        const { body: response } = await request.delete({
            route: '/equipment/delete/a',
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13101');
    });

    it('Should return error code 13101 when trying to reach: /equipment/delete/1a', async () => {
        const { body: response } = await request.delete({
            route: '/equipment/delete/1a',
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13101');
    });

    it('Should return error code 13101 when trying to reach: /equipment/delet/1', async () => {
        const { body: response } = await request.delete({
            route: '/equipment/delet/1',
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13101');
    });

    it('Should return error code 13101 when trying to reach: /equipment/delete/', async () => {
        const { body: response } = await request.delete({
            route: '/equipment/delete/',
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('11005');
    });

    it('Should return error code 13101 when trying to reach: /equipment/delete/a1', async () => {
        const { body: response } = await request.delete({
            route: '/equipment/delete/a1',
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13101');
    });

    it('Should return error code 13101 when trying to reach: /equip/delete/a1', async () => {
        const { body: response } = await request.delete({
            route: '/equip/delete/a1',
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13101');
    });
});

describe('Unkown UPDATE equipment routes test', () => {

    it('Should return error code 13101 when trying to reach: /equipment/update/${id}', async () => {
        const id = await factory.generateEquipmentId();
        const { body: response } = await request.get({
            route: '/equipment/update/' + id,
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13101');
    });

    it('Should return error code 13101 when trying to reach: /equipment/update/aa', async () => {
        const id = await factory.generateEquipmentId();
        const { body: response } = await request.get({
            route: '/equipment/update/aa',
            headers: { authorization: validToken },
            body: { id: id }
        });
        expect(response.code).toBe('13101');
    });

    it('Should return error code 13101 when trying to reach: /equip/update', async () => {
        const id = await factory.generateEquipmentId();
        const { body: response } = await request.get({
            route: '/equip/update',
            headers: { authorization: validToken },
            body: { id: id }
        });
        expect(response.code).toBe('13101');
    });

    it('Should return error code 13101 when trying to reach: /equipement/update', async () => {
        const id = await factory.generateEquipmentId();
        const { body: response } = await request.get({
            route: '/equipement/update',
            headers: { authorization: validToken },
            body: { id: id }
        });
        expect(response.code).toBe('13101');
    });

});

describe('Unkown GET ALL equipment routes tpostgetest', () => {

    it('Should return error code 13101 when trying to reach: /user/all/', async () => {
        const { body: response } = await request.get({
            route: '/user/all/',
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13101');
    });

    it('Should return error code 13101 when trying to reach: /equip/all', async () => {
        const { body: response } = await request.get({
            route: '/equip/all',
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13101');
    });
});

describe('Unkown SEARCH equipment routes test', () => {

    it('Should return error code 13101 when trying to reach: /equipment/search/1', async () => {
        const { body: response } = await request.post({
            route: '/equipment/search/1',
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13101');
    });

    it('Should return error code 13101 when trying to reach: /equipment/research', async () => {
        const { body: response } = await request.post({
            route: '/equipment/research',
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13101');
    });

    it('Should return error code 13101 when trying to reach: /equipment/ssearch', async () => {
        const { body: response } = await request.post({
            route: '/equipment/ssearch',
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13101');
    });

    it('Should return error code 13101 when trying to reach: /equip/search', async () => {
        const { body: response } = await request.post({
            route: '/equip/search',
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13101');
    });

    it('Should return error code 13101 when trying to reach: /equipement/search', async () => {
        const { body: response } = await request.post({
            route: '/equipement/search',
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13101');
    });
});

describe('Unkown REGISTER user routes test', () => {

    it('Should return error code 13101 when trying to reach: /auth/registry', async () => {
        const { body: response } = await request.post({
            route: '/auth/registry',
            headers: { authorization: validToken },
            body: factory.generateUser()
        });
        expect(response.code).toBe('13101');
    });

    it('Should return error code 13101 when trying to reach: /authentication/register', async () => {
        const { body: response } = await request.post({
            route: '/authentication/register',
            headers: { authorization: validToken },
            body: factory.generateUser()
        });
        expect(response.code).toBe('13101');
    });

    it('Should return error code 13101 when trying to reach: /user/register', async () => {
        const { body: response } = await request.post({
            route: '/user/register',
            headers: { authorization: validToken },
            body: factory.generateUser()
        });
        expect(response.code).toBe('13101');
    });

    it('Should return error code 13101 when trying to reach: /user/sign-up', async () => {
        const { body: response } = await request.post({
            route: '/user/sign-up',
            headers: { authorization: validToken },
            body: factory.generateUser()
        });
        expect(response.code).toBe('13101');
    });

    it('Should return error code 13101 when trying to reach: /authentication/sign-up', async () => {
        const { body: response } = await request.post({
            route: '/authentication/sign-up',
            headers: { authorization: validToken },
            body: factory.generateUser()
        });
        expect(response.code).toBe('13101');
    });

    it('Should return error code 13101 when trying to reach: /auth/sign-up', async () => {
        const { body: response } = await request.post({
            route: '/auth/sign-up',
            headers: { authorization: validToken },
            body: factory.generateUser()
        });
        expect(response.code).toBe('13101');
    });
});

describe('Unkown AUTHENTICATiON user routes test', () => {

    it('Should return error code 13101 when trying to reach: /auth/auth', async () => {
        const { body: response } = await request.post({
            route: '/auth/auth',
            headers: { authorization: validToken },
            body: factory.generateUser()
        });
        expect(response.code).toBe('13101');
    });

    it('Should return error code 13101 when trying to reach: /auth/login', async () => {
        const { body: response } = await request.post({
            route: '/auth/login',
            headers: { authorization: validToken },
            body: factory.generateUser()
        });
        expect(response.code).toBe('13101');
    });

    it('Should return error code 13101 when trying to reach: /authentication/auth', async () => {
        const { body: response } = await request.post({
            route: '/authentication/auth',
            headers: { authorization: validToken },
            body: factory.generateUser()
        });
        expect(response.code).toBe('13101');
    });

    it('Should return error code 13101 when trying to reach: /user/login', async () => {
        const { body: response } = await request.post({
            route: '/user/login',
            headers: { authorization: validToken },
            body: factory.generateUser()
        });
        expect(response.code).toBe('13101');
    });

    it('Should return error code 13101 when trying to reach: /user/sign-in', async () => {
        const { body: response } = await request.post({
            route: '/user/sign-in',
            headers: { authorization: validToken },
            body: factory.generateUser()
        });
        expect(response.code).toBe('13101');
    });

    it('Should return error code 13101 when trying to reach: /authentication/authentication', async () => {
        const { body: response } = await request.post({
            route: '/authentication/authentication',
            headers: { authorization: validToken },
            body: factory.generateUser()
        });
        expect(response.code).toBe('13101');
    });
});


describe('Invalid http method for CREATE equipment route test', () => {

    it('Should return error code 13102 when trying to reach CREATE equipment route with DELETE http method', async () => {
        const { body: response } = await request.delete({
            route: routes.equipment.create,
            headers: { authorization: validToken },
            body: factory.generateEquipment()
        });
        expect(response.code).toBe('13102');
    });
    it('Should return error code 13102 when trying to reach CREATE equipment route with PUT http method', async () => {
        const { body: response } = await request.put({
            route: routes.equipment.create,
            headers: { authorization: validToken },
            body: factory.generateEquipment()
        });
        expect(response.code).toBe('13102');
    });
    it('Should return error code 13102 when trying to reach CREATE equipment route with GET http method', async () => {
        const { body: response } = await request.get({
            route: routes.equipment.create,
            headers: { authorization: validToken },
            body: factory.generateEquipment()
        });
        expect(response.code).toBe('13102');
    });
});

describe('Invalid http method for DELETE equipment route test', () => {

    it('Should return error code 13102 when trying to reach DELETE equipment route with POST http method', async () => {
        const id = await factory.generateEquipmentId();
        const { body: response } = await request.post({
            route: routes.equipment.delete(id),
            headers: { authorization: validToken },
            body: factory.generateEquipment()
        });
        expect(response.code).toBe('13102');
    });
    it('Should return error code 13102 when trying to reach DELETE equipment route with PUT http method', async () => {
        const id = await factory.generateEquipmentId();
        const { body: response } = await request.put({
            route: routes.equipment.delete(id),
            headers: { authorization: validToken },
            body: factory.generateEquipment()
        });
        expect(response.code).toBe('13102');
    });
    it('Should return error code 13102 when trying to reach DELETE equipment route with GET http method', async () => {
        const id = await factory.generateEquipmentId();
        const { body: response } = await request.get({
            route: routes.equipment.delete(id),
            headers: { authorization: validToken },
            body: factory.generateEquipment()
        });
        expect(response.code).toBe('13102');
    });
});

describe('Invalid http method for GET ALL equipment route test', () => {

    it('Should return error code 13102 when trying to reach GET ALL equipment route with POST http method', async () => {
        const { body: response } = await request.post({
            route: routes.equipment.getAll,
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13102');
    });
    it('Should return error code 13102 when trying to reach GET ALL equipment route with PUT http method', async () => {
        const { body: response } = await request.put({
            route: routes.equipment.getAll,
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13102');
    });
    it('Should return error code 13102 when trying to reach GET ALL equipment route with DELETE http method', async () => {
        const { body: response } = await request.delete({
            route: routes.equipment.getAll,
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13102');
    });
});

describe('Invalid http method for SEARCH equipment route test', () => {

    it('Should return error code 13102 when trying to reach GET ALL equipment route with GET http method', async () => {
        const { body: response } = await request.get({
            route: routes.equipment.search,
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13102');
    });
    it('Should return error code 13102 when trying to reach GET ALL equipment route with PUT http method', async () => {
        const { body: response } = await request.put({
            route: routes.equipment.search,
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13102');
    });
    it('Should return error code 13102 when trying to reach GET ALL equipment route with DELETE http method', async () => {
        const { body: response } = await request.delete({
            route: routes.equipment.search,
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13102');
    });
});

describe('Invalid http method for UPDATE equipment route test', () => {

    it('Should return error code 13102 when trying to reach GET ALL equipment route with GET http method', async () => {
        const { body: response } = await request.get({
            route: routes.equipment.update,
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13102');
    });
    it('Should return error code 13102 when trying to reach GET ALL equipment route with POST http method', async () => {
        const { body: response } = await request.post({
            route: routes.equipment.update,
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13102');
    });
    it('Should return error code 13102 when trying to reach GET ALL equipment route with DELETE http method', async () => {
        const { body: response } = await request.delete({
            route: routes.equipment.update,
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13102');
    });
});

describe('Invalid http method for REGISTER user route test', () => {

    it('Should return error code 13102 when trying to reach REGISTER equipment route with GET http method', async () => {
        const { body: response } = await request.get({
            route: routes.authentication.register,
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13102');
    });
    it('Should return error code 13102 when trying to reach REGISTER equipment route with PUT http method', async () => {
        const { body: response } = await request.put({
            route: routes.authentication.register,
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13102');
    });
    it('Should return error code 13102 when trying to reach REGISTER equipment route with DELETE http method', async () => {
        const { body: response } = await request.delete({
            route: routes.authentication.register,
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13102');
    });
});

describe('Invalid http method for AUTHENTICATE user route test', () => {

    it('Should return error code 13102 when trying to reach AUTHENTICATE user route with GET http method', async () => {
        const { body: response } = await request.get({
            route: routes.authentication.authenticate,
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13102');
    });
    it('Should return error code 13102 when trying to reach AUTHENTICATE user route with PUT http method', async () => {
        const { body: response } = await request.put({
            route: routes.authentication.authenticate,
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13102');
    });
    it('Should return error code 13102 when trying to reach AUTHENTICATE user route with DELETE http method', async () => {
        const { body: response } = await request.delete({
            route: routes.authentication.authenticate,
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13102');
    });
});