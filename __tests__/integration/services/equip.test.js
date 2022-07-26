const { resolve: getPath } = require('path');
const services = require(getPath('src', 'api', 'services', 'equipmentServices'));

const factory = require('../../factory');


describe('Create test', () => {

    const equipment = factory.generateEquipment();

    it('should register a new equipment in database with success', async () => {
        const response = await services.createEquipment(equipment);
        expect(response.status).toBe(200);
    });

    it('should return status 400 when trying to create an existent equipment', async () => {
        const response = await services.createEquipment(equipment);
        expect(response.status).toBe(400);
    });

    it('should return status 400 when trying to create a null equipment into the database', async () => {
        const response = await services.createEquipment(undefined);
        expect(response.status).toBe(200);
    });
   
    it('should return status 400 when trying to create an equipment without ', async () => {
        const response = await services.createEquipment(undefined);
        expect(response.status).toBe(200);
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

        invalidEquipment.statusId = 'a';        

        const response = await services.createEquipment(invalidEquipment);
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

