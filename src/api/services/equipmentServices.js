const equipmentRepository = require('../repositories/equipmentRepository');

const callRepository = async (callback, params=undefined) => {
    try {        
        return {
            status : 200,    
            equipment : await callback(),
        };
    } catch (error) {
        return {
            status : 400,    
            error,
        };
    }
}

function getEquipmentBy(field) {
   return callRepository(equipmentRepository.getEquipmentBy, field);
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

module.exports = {
    getEquipmentBy : getEquipmentBy,
    getAllEquipment : getAllEquipment
}