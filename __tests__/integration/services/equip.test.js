const { resolve: getPath } = require('path');
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

describe('Delete test', () => {

    it('should return status 200 when trying delete a equipment using their id', async () => {

    });
});

describe('Get by id test', () => {

    it('should give true when comparing sent id with equipment.id given', async () => {
        const { equipment_id } = await services.createEquipment(factory.generateEquipment());
        const response = await services.getEquipmentByField({ id: equipment_id });

        expect(response.equipment.id).toBe(equipment_id);
    });
});

describe('Get all test', () => {

    it('should return all equipments from database', async () => {
        const response = await services.getAllEquipment();
        expect(response.status).toBe(200);
    });
});


