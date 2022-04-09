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

describe('Delete equipment test', () => {

    it('should return status 200 when trying delete a equipment using their id', async () => {
        const { equipment: equipment_id } = await services.createEquipment(factory.generateEquipment());
        const response = await services.deleteEquipmentById(equipment_id);
        expect(response.status).toBe(200);
    });
});

describe('Get by heritage equipment test', () => {

    it('should give true when comparing sent id with equipment.id given', async () => {
        const { equipment: equipment_id } = await services.createEquipment(factory.generateEquipment());
        const response = await services.getEquipmentByField({ id: equipment_id });

        expect(response.equipment.id).toBe(equipment_id);
    });
});

describe('Get all equipment test', () => {

    it('should return all equipments from database', async () => {
        const response = await services.getAllEquipment();

        expect(response.equipment.length > 0).toBe(true);
    });
});

describe('Update equipment test', () => {

    it('should return status 200 when updating a equipment status on database', async () => {
        const {
            equipment: equipment_id
        } = await services.createEquipment(
            factory.generateEquipment()
        );

        const updatedEquipment = {
            id: equipment_id,
            status: 'it is not available',
            current_location: 'SIASS'
        };

        const response = await services.updateEquipment(updatedEquipment);

        expect(response.status).toBe(200);
    })
});

