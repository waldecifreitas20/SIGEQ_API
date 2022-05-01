const { utils, repositories } = require('../../utils/paths');

const equipmentRepository = require(repositories.equipment);
const { getErrorResponse } = require(utils.errors);


const _callRepository = async (action, params, successStatus = 200) => {
    try {
        return {
            status: successStatus,
            response: await action(params)
        };
    } catch (error) {
        return getErrorResponse(error);
    }
}


const _toUpdate = async equipment => {
  

    if (equipment.status !== undefined) {
        await equipmentRepository.updateStatus(equipment);
    }

    if (equipment.current_location !== undefined) {
        await equipmentRepository.updateLocation(equipment);
    }

    if (equipment.image !== undefined) {
        await equipmentRepository.updateImage(equipment);
    }

    return 'equipment updated with success';
}


module.exports = {
    getEquipmentByField: async function (field) {
        const repositoryResponse = await _callRepository(
            equipmentRepository.getEquipmentBy, field, 200
        );
        
        return {
            status: repositoryResponse.status,
            equipment: repositoryResponse.response,
            error: repositoryResponse.error,
            description : repositoryResponse.description
        };
    },

    getAllEquipment: async function () {
        const repositoryResponse = await _callRepository(equipmentRepository.getAll, 200);
        return {
            status: repositoryResponse.status,
            equipments: repositoryResponse.response,
            error: repositoryResponse.error,
            description : repositoryResponse.description
        };
    },

    createEquipment: async function (equipmentData) {
        const repositoryResponse = await _callRepository(equipmentRepository.create, equipmentData);
        return {
            status: repositoryResponse.status,
            equipment_id: repositoryResponse.response,
            error: repositoryResponse.error,
            description : repositoryResponse.description
        };
    },

    updateEquipment: async function (equipment) {
        const repositoryResponse = await _callRepository(equipmentRepository.updateFields, equipment, 204);
        return {
            status: repositoryResponse.status,
            error: repositoryResponse.error,
            description : repositoryResponse.description
        };
    },

    deleteEquipmentById: async function (id) {
        const repositoryResponse = await _callRepository(equipmentRepository.remove, id, 204);
        return {
            status: repositoryResponse.status,
            error: repositoryResponse.error,
            description : repositoryResponse.description
        };
    },
}