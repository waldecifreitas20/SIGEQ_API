const equipmentRepository = require('../repositories/equipmentRepository');

const callRepository = async (callback, params=undefined) => {
    try {        
        return {
            status : 200,    
            equipment : await callback(params),
        };
    } catch (error) {
        console.log(error);
        return {
            status : 400,    
            error,
        };
    }
}

async function getEquipmentBy(field) { 
   return await callRepository(equipmentRepository.getEquipmentBy, field);
}

async function getAllEquipment() {
    return await callRepository(equipmentRepository.getAll);
}

async function createEquipment(equipmentData) {
    try {
        const equipment = await equipmentRepository.create(equipmentData);
        return equipment;
    } catch (error) {
        return 'deu merda aqui';
    }
}

async function deleteEquipment(equipmentId) {}
async function updateEquipment(equipmentId) {}

module.exports = {
    getEquipmentBy : getEquipmentBy,
    getAllEquipment : getAllEquipment,
    createEquipment : createEquipment,
    deleteEquipment : deleteEquipment,
    updateEquipment : updateEquipment,
}