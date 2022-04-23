const { utils, models } = require('../../utils/paths');

const EquipmentModel = require(models.equipment);

const { isEmptyArray } = require(utils.shorts);
const { getErrorResponse } = require(utils.errors);


const _saveChanges = async (model) => {
    return await model.save()
        .catch(() => {
            throw getErrorResponse({
                status: 502,
                error: 'Unexpected error',
                description: 'An error occurred on attempt to save changes'
            });
        });
}

module.exports = {

    getEquipmentBy: async function (field) {
        const equipment = await EquipmentModel.findOne({ where: field });
        if (isEmptyArray(equipment)) {
            throw getErrorResponse({
                status: 400,
                error: 'cannot find equipment',
                description : 'equipment might not be registered yet. Check fields'
            });
        }
        return equipment;
    },

    getAll: async function () {
        const allEquipments = await EquipmentModel.findAll();
        if (isEmptyArray(allEquipments)) {
            throw getErrorResponse({
                status: 400,
                error: 'cannot find any equipment into the database',
                description : 'database might be empty'
            });
        }
        return allEquipments;
    },

    create: async function (equipment) {
        try {
            const equipmentFromDatabase = await EquipmentModel.create(equipment);
            return equipmentFromDatabase.id;
        } catch (error) {
            throw getErrorResponse({
                status : 400,
                error : 'cannot create equipment', 
                description : 'equipment might be already registered'
            });
        }
    },

    remove: async function (id) {
        const equipment = await EquipmentModel.findOne({ where: { id: id } });
        const isEquipmentNull = !equipment;

        if (isEquipmentNull) {
            throw getErrorResponse({
                status : 400,
                error : 'equipment does not exist',
                description : 'equipment might not be registered yet. Check params'
            });
        }
        await equipment.destroy();

        return true;
    },

    updateImage: async function (equipment) {
        return await EquipmentModel.findOne({
            where: { id: equipment.id }
        }).then(async oldEquipment => {
            oldEquipment.image = equipment.image;

            return await _saveChanges(oldEquipment);
        });
    },

    updateLocation: async function (equipment) {
        return await EquipmentModel.findOne({
            where: { id: equipment.id }
        }).then(async oldEquipment => {
            oldEquipment.current_location = equipment.current_location;

            return await _saveChanges(oldEquipment);
        })
    },

    updateStatus: async function (equipment) {
        return await EquipmentModel.findOne({
            where: { id: equipment.id }
        }).then(async oldEquipment => {
            oldEquipment.status = equipment.status;

            return await _saveChanges(oldEquipment);
        })
    }
}