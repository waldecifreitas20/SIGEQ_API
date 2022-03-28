const { resolve : getPath} = require('path');
const services = require(getPath('src', 'api', 'services', 'equipmentServices'));

const factory = require('../../factory');

describe('Create test', () => {
    const equipment = factory.generateEquipment();

    it('should register a new equipment in database with success', async () => {
        const response = await services.createEquipment(equipment);
        expect(response.status).toBe(200);
    });
        
    it('should return status 400 when trying create already exists equipment', async () => {
        const response = await services.createEquipment(equipment);
        expect(response.status).toBe(400);
    });
    
    it('should return status 400 when trying create a null in database', async () => {
        const response = await services.createEquipment(undefined);
        expect(response.status).toBe(400);
    });
});

describe('Delete equipment test', () => {
    
    it('should return status 200 when trying delete a equipment using their id', async () => {
        const { equipment } = await services.createEquipment(factory.generateEquipment());
        const response = await services.deleteEquipmentById(equipment.id);
        console.log(response.body);
        expect(response.status).toBe(200);
    });
});
describe('Get by heritage equipment test', () => {});
describe('Get all equipment test', () => {});
describe('Update equipment test', () => {});

