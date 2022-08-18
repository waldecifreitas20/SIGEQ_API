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

    it("should return error code 13103 when tryng to reach UPDATE equipment's route", async () => {
        const {body : response} = await request.put({
            route: routes.equipment.update,
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13103');
    });

    it("should return error code 13103 when tryng to reach SEARCH equipment's route", async () => {
        const {body : response} = await request.post({
            route: routes.equipment.search,
            headers: { authorization: validToken },
        });
        expect(response.code).toBe('13103');
    });
});

describe('Has user required fields test', () => {

    it('should return error code 11002 when trying to register user without first name', async () => {

    });
    
    it('should return error code 11002 when trying to register user without surname', async () => {

    });
    
    it('should return error code 11002 when trying to register user without email', async () => {

    });
    
    it('should return error code 11002 when trying to register user without password', async () => {

    });
    
    it('should return error code 11002 when trying to register user without cpf', async () => {

    });

    
    it('should return error code 11002 when trying to authenticate user without email', async () => {

    });
    
    it('should return error code 11002 when trying to authenticate user without password', async () => {

    });
  

});

describe('Has equipment required fields test', () => {

    it('should return error code 11002 when trying to reach a route without title', async () => {

    });
    
    it('should return error code 11002 when trying to reach a route without model', async () => {

    });
    
    it('should return error code 11002 when trying to reach a route without categoryId', async () => {

    });
    
    it('should return error code 11002 when trying to reach a route without manufacturerId', async () => {

    });
    
    it('should return error code 11002 when trying to reach a route without locationId', async () => {

    });
    
    it('should return error code 11002 when trying to reach a route without statusId', async () => {

    });

});

describe('Has equipment id', () => {});