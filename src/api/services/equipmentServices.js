const equipmentRepository = require('../repositories/equipmentRepository');

const _callRepository = async (callback, params = undefined) => {
    try {
        return {
            status: 200,
            equipment: await callback(params),
        };
    } catch (error) {
        console.log(error);
        return {
            status: error.code,
            error: error.message,
        };
    }
}

const _toUpdate = async equipment => {
    try {
        if (equipment.status !== undefined) {
            await equipmentRepository.updateStatus(equipment);
        }

        if (equipment.current_location !== undefined) {
            await equipmentRepository.updateLocation(equipment);
        }

        if (equipment.image !== undefined) {
            await equipmentRepository.updateImage(equipment);
        }

        return {
            status: 200,
            message: 'equipment updated with success'
        }
    } catch (error) {
        return {
            status: 400,
            error
        }
    }
}


module.exports = {
    getEquipmentByField: async function (field) {
        return await _callRepository(equipmentRepository.getEquipmentBy, field);
    },

    getAllEquipment: async function () {
        return await _callRepository(equipmentRepository.getAll);
    },

    createEquipment: async function (equipmentData) {
        return await _callRepository(equipmentRepository.create, equipmentData);
    },

    updateEquipment: async function (equipment) {
        return await _toUpdate(equipment);
    },

    deleteEquipmentById: async function (id) {
        return await _callRepository(equipmentRepository.remove, id);
    },
}