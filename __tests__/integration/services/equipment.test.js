const { resolve : getPath} = require('path');
const services = require(getPath('src', 'api', 'services', 'equipmentServices'));

const factory = require('../../factory');

describe('Create test', () => {
    const equipment = factory.generateEquipment();

    it('should register a new equipment in database with success', async () => {
        const response = await services.createEquipment(equipment);
        expect(response.status).toBe(200);
    });
    
    it('should return status 401 when trying create new equioment without token', async () => {

    });
    
    it('should return status 401 when trying create new equipment without create permission', async () => {

    });
});

describe('Delete equipment test', () => {});
describe('Get by heritage equipment test', () => {});
describe('Get all equipment test', () => {});
describe('Update equipment test', () => {});

