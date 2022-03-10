const equipmentRepository = require('../repositories/equipmentRepository');

async function getEquipmentBy(field) {
    try {
        return {
            status : 200,    
            equipment : await equipmentRepository.getEquipmentBy(field),
        };
    } catch (error) {
        return {
            status : 200,    
            error,
        };
    }
}

module.exports = {
    getEquipmentBy : getEquipmentBy
}