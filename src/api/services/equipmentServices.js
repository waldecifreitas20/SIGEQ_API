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
            error: repositoryResponse.error,
            equipment: repositoryResponse.response
        };
    },

    getAllEquipment: async function () {
        const repositoryResponse = await _callRepository(equipmentRepository.getAll, 200);
        return {
            status: repositoryResponse.status || 200,
            error: repositoryResponse.error,
        };
    },

    createEquipment: async function (equipmentData) {
        const repositoryResponse = await _callRepository(equipmentRepository.create, equipmentData);
        return {
            status: repositoryResponse.status,
            error: repositoryResponse.error,
            equipment_id: repositoryResponse.response
        };
    },

    updateEquipment: async function (equipment) {
        const repositoryResponse = await _callRepository(_toUpdate, equipment, 204);
        return {
            status: repositoryResponse.status,
            error: repositoryResponse.error
        };
    },

    deleteEquipmentById: async function (id) {
        const repositoryResponse = await _callRepository(equipmentRepository.remove, id, 204);
        return {
            status: repositoryResponse.status,
            error: repositoryResponse.error
        };
    },
}