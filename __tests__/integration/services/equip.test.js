const { resolve: getPath } = require('path');
const services = require(getPath('src', 'api', 'services', 'equipmentServices'));

const factory = require('../../factory');

require('./syncDB');

describe('Create test', () => {

    const equipment = factory.generateEquipment();

    it('should register a new equipment in database with success', async () => {
        const response = await services.createEquipment(equipment);
        expect(response.status).toBe(200);
    });

    it('should return status 400 when trying to create an existing equipment', async () => {
        const response = await services.createEquipment(equipment);
        expect(response.status).toBe(400);
    });

    it('should return status 400 when trying to create a null equipment into the database', async () => {
        const response = await services.createEquipment(undefined);
        expect(response.status).toBe(400);
    });

    it('should return status 400 when trying to create an equipment that has no required fields ', async () => {
        const response = await services.createEquipment({
            "model": "15-cdf",
            "warrantyExpiresAt": null,
            "image": "454-6-564-654"
        });

        expect(response.status).toBe(400);
    });

    it('should return status 400 when trying to create an equipment with invalid category id', async () => {
        let invalidEquipment = factory.generateEquipment();

        invalidEquipment.categoryId = 'a';

        const response = await services.createEquipment(invalidEquipment);
        expect(response.status).toBe(400);
    });

    it('should return status 400 when trying to create an equipment with invalid location id', async () => {
        let invalidEquipment = factory.generateEquipment();

        invalidEquipment.locationId = 'a';

        const response = await services.createEquipment(invalidEquipment);
        expect(response.status).toBe(400);
    });

    it('should return status 400 when trying to create an equipment with invalid manufacturer id', async () => {
        let invalidEquipment = factory.generateEquipment();

        invalidEquipment.manufacturerId = 'a';

        const response = await services.createEquipment(invalidEquipment);
        expect(response.status).toBe(400);
    });

    it('should return status 400 when trying to create an equipment with invalid status id', async () => {
        let invalidEquipment = factory.generateEquipment();

        invalidEquipment.statusId = 's';

        const response = await services.createEquipment(invalidEquipment);
        expect(response.status).toBe(400);
    });

    it('should return status 400 when trying to create an equipment with nonexisting category id', async () => {
        let invalidEquipment = factory.generateEquipment();

        invalidEquipment.categoryId = -1;

        const response = await services.createEquipment(invalidEquipment);
        expect(response.status).toBe(400);
    });

    it('should return status 400 when trying to create an equipment with nonexisting location id', async () => {
        let invalidEquipment = factory.generateEquipment();

        invalidEquipment.locationId = -1;

        const response = await services.createEquipment(invalidEquipment);
        expect(response.status).toBe(400);
    });

    it('should return status 400 when trying to create an equipment with nonexisting manufacturer id', async () => {
        let invalidEquipment = factory.generateEquipment();

        invalidEquipment.manufacturerId = -1;

        const response = await services.createEquipment(invalidEquipment);
        expect(response.status).toBe(400);
    });

    it('should return status 400 when trying to create an equipment with nonexisting status id', async () => {
        let invalidEquipment = factory.generateEquipment();

        invalidEquipment.statusId = -1;

        const response = await services.createEquipment(invalidEquipment);
        expect(response.status).toBe(400);
    });

});

const _registerEquipmentId = async equipment => {
    const { equipment_id: id } = await services.createEquipment(equipment);
    return id;
}

describe('Delete test', () => {

    it('should return status 204 when trying to delete a equipment using its own id', async () => {
        const equipmentId = await factory.generateEquipmentId();
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
        const SENT_ID = await factory.generateEquipmentId();
        const response = await services.getEquipmentsByFields({ id: SENT_ID });
        const RETURNED_ID = response.equipments[0].id;

        expect(SENT_ID).toBe(RETURNED_ID);
    });

    it('should return status 400 when trying to update equipment that does not exist', async () => {
        const response = await services.getEquipmentsByFields({ id: -1 });

        expect(response.status).toBe(400);
    });

    it('should return status 400 when sending nothing', async () => {
        const response = await services.getEquipmentsByFields();

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
        const equipmentId = await factory.generateEquipmentId();
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
    
    it('should return status 400 when updating a equipment sending noninteger id', async () => {
        const nonIntegerId = 'a';
        const equipmentToUpdate = factory.generateEquipment();

        equipmentToUpdate.id = nonIntegerId;
        const response = await services.updateEquipment(equipmentToUpdate);

        expect(response.status).toBe(400);
    });
   
    it('should return status 400 when trying to send no equipment', async () => {
        const response = await services.updateEquipment();

        expect(response.status).toBe(400);
    });
    
    it('should return status 400 when trying to send no required fields', async () => {
        const equipment = factory.generateEquipment();
        const id = await _registerEquipmentId(equipment);
        
        equipment.id = id;
        equipment.categoryId = undefined;
        equipment.title = undefined;

        const response = await services.updateEquipment(equipment);
        expect(response.status).toBe(400);
    });

});

