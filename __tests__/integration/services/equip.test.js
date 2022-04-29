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


const _generateValidEquipmentId = async () => {
    const { equipment_id: id } = await services.createEquipment(factory.generateEquipment());
    return id;
}

describe('Delete test', () => {

    it('should return status 204 when trying to delete a equipment using its own id', async () => {
        const equipmentId = await _generateValidEquipmentId();
        const response = await services.deleteEquipmentById(equipmentId);

        expect(response.status).toBe(204);
    });

    it('should return status 400 when trying to delete a equipment without sends its id', async () => {
        const response = await services.deleteEquipmentById();

        expect(response.status).toBe(400);
    });

    it('should return status 400 when trying to delete a equipment without sending fake id', async () => {
        const FAKE_ID = -1;
        const response = await services.deleteEquipmentById(FAKE_ID);

        expect(response.status).toBe(400);
    });
});

describe('Search by id test', () => {

    it('should be true when comparing sent id with id returned', async () => {
        const SENT_ID = await _generateValidEquipmentId();
        const response = await services.getEquipmentByField({ id: SENT_ID });
        const RETURNED_ID = response.equipment.id;

        expect(SENT_ID).toBe(RETURNED_ID);
    });

    it('should return status 400 when trying to update equipment that does not exist', async () => {
        const response = await services.getEquipmentByField({ id: -1 });

        expect(response.status).toBe(400);
    });

    it('should return status 400 when sending nothing', async () => {
        const response = await services.getEquipmentByField();

        expect(response.status).toBe(400);
    });

});

describe('Get all test', () => {

    it('should return all equipments from database', async () => {
        const response = await services.getAllEquipment();

        expect(response.status).toBe(200);
    });
});

describe('Update test', () => {

    it('should return status 204 when updating a equipment using its id', async () => {
        const equipmentId = await _generateValidEquipmentId();
        const equipmentToUpdate = factory.generateEquipment();

        equipmentToUpdate.id = equipmentId;

        const response = await services.updateEquipment(equipmentToUpdate);

        expect(response.status).toBe(204);
    });

    it('should return status 400 when updating a equipment sending nonexistent id', async () => {
        const nonExistentId = -1;
        const equipmentToUpdate = factory.generateEquipment();

        equipmentToUpdate.id = nonExistentId;
        const response = await services.updateEquipment(equipmentToUpdate);

        expect(response.status).toBe(400);
    });

});

