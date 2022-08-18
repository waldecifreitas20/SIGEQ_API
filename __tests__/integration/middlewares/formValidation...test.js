const request = require('../../requestTester');
const routes = require('../../routes');
const factory = require('../../factory');
const { generateToken } = require('../../../src/utils/security.js'); const { response } = require('express');
;

const validToken = 'Bearer ' + generateToken({
    user: factory.generateUser(),
    permissions: factory.generatePermissions({

    })
});

describe('request body is null test', () => {

    it("should return error code 13103 when tryng to reach UPDATE user's route", async () => {
        const { body: response } = await request.put({
            route: routes.equipment.update,
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13103');
    });

    it("should return error code 13103 when tryng to reach SEARCH user's route", async () => {
        const { body: response } = await request.post({
            route: routes.equipment.search,
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13103');
    });
});

describe('Has user required fields test', () => {

    it('should return error code 11002 when trying to register user without first name', async () => {
        const user = factory.generateUser();

        user.firstName = undefined;

        const { body: response } = await request.post({
            route: routes.authentication.register,
            headers: { authorization: validToken },
            body: user
        });

        expect(response.code).toBe('11002');
    });

    it('should return error code 11002 when trying to register user without surname', async () => {
        const user = factory.generateUser();

        user.surname = undefined;

        const { body: response } = await request.post({
            route: routes.authentication.register,
            headers: { authorization: validToken },
            body: user
        });

        expect(response.code).toBe('11002');
    });

    it('should return error code 11002 when trying to register user without email', async () => {
        const user = factory.generateUser();

        user.email = undefined;

        const { body: response } = await request.post({
            route: routes.authentication.register,
            headers: { authorization: validToken },
            body: user
        });

        expect(response.code).toBe('11002');
    });

    it('should return error code 11002 when trying to register user without password', async () => {
        const user = factory.generateUser();

        user.password = undefined;

        const { body: response } = await request.post({
            route: routes.authentication.register,
            headers: { authorization: validToken },
            body: user
        });

        expect(response.code).toBe('11002');
    });

    it('should return error code 11002 when trying to register user without cpf', async () => {
        const user = factory.generateUser();

        user.cpf = undefined;

        const { body: response } = await request.post({
            route: routes.authentication.register,
            headers: { authorization: validToken },
            body: user
        });

        expect(response.code).toBe('11002');
    });


    it('should return error code 11002 when trying to authenticate user without email', async () => {
        const user = factory.generateUser();

        user.email = undefined;

        const { body: response } = await request.post({
            route: routes.authentication.authenticate,
            headers: { authorization: validToken },
            body: user
        });

        expect(response.code).toBe('11002');
    });

    it('should return error code 11002 when trying to authenticate user without password', async () => {
        const user = factory.generateUser();

        user.email = undefined;

        const { body: response } = await request.post({
            route: routes.authentication.register,
            headers: { authorization: validToken },
            body: user
        });

        expect(response.code).toBe('11002');
    });
});

describe('Has equipment required fields test', () => {

    it('should return error code 11002 when trying to reach a route without title', async () => {
        const equipment = factory.generateEquipment();
    
        equipment.title = undefined;
    
        const {body : response} = await request.post({
            route : routes.equipment.create,
            headers : { authorization : validToken},
            body : equipment    
        });
    
        expect(response.code).toBe('11002');
    });

    it('should return error code 11002 when trying to reach a route without model', async () => {
        const equipment = factory.generateEquipment();
    
        equipment.model = undefined;
    
        const {body : response} = await request.post({
            route : routes.equipment.create,
            headers : { authorization : validToken},
            body : equipment    
        });
    
        expect(response.code).toBe('11002');
    });

    it('should return error code 11002 when trying to reach a route without categoryId', async () => {
        const equipment = factory.generateEquipment();
    
        equipment.categoryId = undefined;
    
        const {body : response} = await request.post({
            route : routes.equipment.create,
            headers : { authorization : validToken},
            body : equipment    
        });
    
        expect(response.code).toBe('11002');
    });

    it('should return error code 11002 when trying to reach a route without manufacturerId', async () => {
        const equipment = factory.generateEquipment();
    
        equipment.manufacturerId = undefined;
    
        const {body : response} = await request.post({
            route : routes.equipment.create,
            headers : { authorization : validToken},
            body : equipment    
        });
    
        expect(response.code).toBe('11002');
    });

    it('should return error code 11002 when trying to reach a route without locationId', async () => {
        const equipment = factory.generateEquipment();
    
        equipment.locationId = undefined;
    
        const {body : response} = await request.post({
            route : routes.equipment.create,
            headers : { authorization : validToken},
            body : equipment    
        });
    
        expect(response.code).toBe('11002');
    });

    it('should return error code 11002 when trying to reach a route without statusId', async () => {
        const equipment = factory.generateEquipment();
    
        equipment.statusId = undefined;
    
        const {body : response} = await request.post({
            route : routes.equipment.create,
            headers : { authorization : validToken},
            body : equipment    
        });
    
        expect(response.code).toBe('11002');
    });
});

describe('Has equipment id', () => { 

    it('should return error code 11004 when trying to update equipment sending no id', async () => {
        const {body : response} = await request.put({
            route : routes.equipment.update,
            headers : { authorization : validToken},
            body : factory.generateEquipment()    
        });
        expect(response.code).toBe('11004');
    });
});