const equipmentRepository = require('../repositories/equipmentRepository');

const callRepository = async (callback, params=undefined) => {
    try {        
        return {
            status : 200,    
            equipment : await callback(params),
        };
    } catch (error) {
        return {
            status : 400,    
            error,
        };
    }
}

module.exports = {
    getEquipmentByField : async (field) => { 
        return await callRepository(equipmentRepository.getEquipmentBy, field);
    },
    getAllEquipment : async () => {
        return await callRepository(equipmentRepository.getAll);
    },
    createEquipment : async (equipmentData) => {
        return await callRepository(equipmentRepository.create, equipmentData);  
    },
    deleteEquipmentById : async (id) => {
        return await callRepository(equipmentRepository.remove, id);
    },
    updateEquipment : async (equipment) => {
        return await callRepository(equipmentRepository.update, equipment);
    },
}