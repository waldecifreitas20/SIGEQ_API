const {resolve : getPath} = require('path');

const factory = require('../../factory');
const app = require(getPath('src', 'app'));
const { generateToken } = require(getPath('src', 'utils', 'shorts.js'));


describe('Create equipment test', () => {
    const equipment = factory.generateEquipment();
    const permissions = factory.generatePermissions({});

    it('should return status 200 OK when trying create new equipment into the database', async () => {

    });
    
    it('should return status 401 when trying create new equipment without token', async () => {

    });
    
    it('should return status 401 when trying create new equipment without create permission', async () => {

    });
});

describe('Delete equipment test', () => {});
describe('Get by heritage equipment test', () => {});
describe('Get all equipment test', () => {});
describe('Update equipment test', () => {});