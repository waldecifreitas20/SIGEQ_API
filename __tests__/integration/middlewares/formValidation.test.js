const request = require('../../requestTester');
const routes = require('../../routes');
const factory = require('../../factory');
const { generateToken } = require('../../../src/utils/security.js'); const { response } = require('express');
;

const validToken = 'Bearer ' + generateToken({
    user: factory.generateUser(),
    permissions: factory.generatePermissions({})
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