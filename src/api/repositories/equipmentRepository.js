const paths = require('../../utils/paths');

const EquipmentModel = require(paths.models.equipment);
const { isEmptyArray } = require(paths.utils.shorts);
const { exception } = require(paths.utils.errors);


const _saveChanges = async (model) => {
    return await model.save()
        .catch(() => {
            throw exception('cannot save changes', 502);
        });
}

module.exports = {

    getEquipmentBy: async function (field) {
        const equipment = await EquipmentModel.findOne({ where: field });
        if (isEmptyArray(equipment)) {
            throw exception('equipment not found', 400);
        }
        return equipment;
    },

    getAll: async function () {
        const allEquipments = await EquipmentModel.findAll();
        if (isEmptyArray(allEquipments)) {
            throw exception('cannot find any equipment into the database', 400);
        }
        return allEquipments;
    },

    create: async function (equipment) {
        try {
            const equipmentFromDatabase = await EquipmentModel.create(equipment);
            return equipmentFromDatabase.id;
        } catch (error) {
            throw exception('cannot create equipment', 400);
        }
    },

    remove: async function (id) {
        const equipment = await EquipmentModel.findOne({ where: { id: id } });
        const isEquipmentNull = !equipment;

        if (isEquipmentNull) {
            throw exception('equipment does not exist', 400);
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