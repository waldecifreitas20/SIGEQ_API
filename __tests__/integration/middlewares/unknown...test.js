const { resolve: getPath } = require('path');

const factory = require('../../factory');
const request = require('../../requestTester');
const { generateToken } = require(getPath('src', 'utils', 'security.js'));

describe('Unkown routes test', () => {

    it('Should get status 404 when requesting for a unknown route', async () => {
        
    });

    it('Should get status 404 when requesting for a known route within invalid http method', async () => {

    });
});

describe('Invalid http method test', () => {

});