const { resolve : getPath} = require('path');
const services = require(getPath('src', 'api', 'services', 'equipmentServices'));

const factory = require('../../factory');

describe('Create test', () => {
    const equipment = factory.generateEquipment();

    it('should register a new equipment in database', async () => {
        const response = await services.createEquipment(equipment);
        console.log(response);
        expect(response.status).toBe(200);
    });
});