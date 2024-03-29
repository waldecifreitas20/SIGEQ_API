const { utils, repositories } = require('../../utils/paths');

const equipmentRepository = require(repositories.equipment);
const { getErrorResponse } = require(utils.errors);


const _callRepository = async (action = Function(), params = Object(), successStatus = 200) => {
    try {
        return {
            status: successStatus,
            response: await action(params)
        };
    } catch (error) {
        return getErrorResponse(error);
    }
}

const _formatForeigns = (equipments = []) =>{
    let response = [];
    const foreignKeys = ['categoryId', 'manufacturerId', 'locationId', 'statusId'];
    for (const equipment of equipments) {
        for (const key of foreignKeys) {
            equipment[key] = undefined;
        }
        response.push(equipment);
    }
    return response;
}


module.exports = {
    getEquipmentsByFields: async function (searchParams) {
        const repositoryResponse = await _callRepository(
            equipmentRepository.getEquipmentsBy, searchParams, 200
        );
        return {
            status: repositoryResponse.status,
            equipments: _formatForeigns(repositoryResponse.response),
            code: repositoryResponse.code,
            error: repositoryResponse.error,
            description: repositoryResponse.description
        };
    },
 
    getAllEquipment: async function (startId=1, limit=10) {
        const repositoryResponse = await _callRepository(equipmentRepository.getAll, {startId, limit});
        return {
            status: repositoryResponse.status,
            equipments: _formatForeigns(repositoryResponse.response),
            code: repositoryResponse.code,
            error: repositoryResponse.error,
            description: repositoryResponse.description
        };
    },

    createEquipment: async function (equipmentData) {
        const repositoryResponse = await _callRepository(equipmentRepository.create, equipmentData);
        return {
            status: repositoryResponse.status,
            equipment_id: repositoryResponse.response,
            code: repositoryResponse.code,
            error: repositoryResponse.error,
            description: repositoryResponse.description
        };
    },

    updateEquipment: async function (equipment) {
        const repositoryResponse = await _callRepository(equipmentRepository.updateFields, equipment, 204);
        return {
            status: repositoryResponse.status,
            code: repositoryResponse.code,
            error: repositoryResponse.error,
            description: repositoryResponse.description
        };
    },

    deleteEquipmentById: async function (id) {
        const repositoryResponse = await _callRepository(equipmentRepository.remove, id, 204);
        return {
            status: repositoryResponse.status,
            code: repositoryResponse.code,
            error: repositoryResponse.error,
            description: repositoryResponse.description
        };
    },
}