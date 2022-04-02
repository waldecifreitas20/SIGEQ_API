const equipmentRepository = require('../repositories/equipmentRepository');

const _callRepository = async (callback, params=undefined) => {
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

const _whichChangesToDo = async equipment => {
    var failed = false;

    if (equipment.status !== undefined) {
        failed = await equipmentRepository.updateStatus(equipment);
    }

    if (equipment.current_location !== undefined) {
        failed = await equipmentRepository.updateLocation(equipment);
    }

    if (equipment.image !== undefined) {
        failed = await equipmentRepository.updateImage(equipment);
    }



    return failed;
}

module.exports = {
    getEquipmentByField : async function(field)  { 
        return await _callRepository(equipmentRepository.getEquipmentBy, field);
    },
    
    getAllEquipment : async function() {
        return await _callRepository(equipmentRepository.getAll);
    },

    createEquipment : async function(equipmentData) {
        return await _callRepository(equipmentRepository.create, equipmentData);  
    },

    updateEquipment : async function(equipment) {
        return await _callRepository(_whichChangesToDo, equipment);
    },
    
    deleteEquipmentById : async function(id) {
        return await _callRepository(equipmentRepository.remove, id);
    },
}