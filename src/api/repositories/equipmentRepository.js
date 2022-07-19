const { utils, models } = require('../../utils/paths');

const Category = require(models.category);
const Status = require(models.status);
const Manufacturer = require(models.manufacturer);
const Location = require(models.location);
const Equipment = require(models.equipment);

const { isEmptyArray, isEmptyObject } = require(utils.shorts);
const { getErrorResponse } = require(utils.errors);


const _getNotFoundEquipmentError = () => {
    return getErrorResponse({
        status: 400,
        error: 'cannot find equipment',
        description: 'equipment might be not registered yet'
    });
}
const _updateFields = (model, equipment) => {

    const fields = Object.keys(equipment);

    for (let i = 0; i < fields.length; i++) {
        let field = fields[i];
        let isUniqueKey = (field == 'id') || (field == 'heritage');

        if (!isUniqueKey) {
            model[field] = equipment[field];
        }
    }
}

module.exports = {

    getEquipmentsBy: async function (field) {
        const equipments = await Equipment.findAll({ where: field });
        if (isEmptyArray(equipments) || isEmptyObject(field)) {
            throw _getNotFoundEquipmentError();
        }
        return equipments;
    },

    getAll: async function () {
        const allEquipments = await Equipment.findAll();
        if (isEmptyArray(allEquipments)) {
            throw getErrorResponse({
                status: 400,
                error: 'cannot find any equipment into the database',
                description: 'database might be empty'
            });
        }

        return allEquipments;
    },

    create: async function (equipment) {
        try {
            const equipmentFromDatabase = await Equipment.create(equipment,
                { include: [Category, Status, Manufacturer, Location] });

            return equipmentFromDatabase.id;
        } catch (error) {

            throw getErrorResponse({
                status: 400,
                error: 'cannot create equipment',
                description: 'equipment might be already registered'
            });
        }
    },

    remove: async function (id) {
        const equipment = await Equipment.findOne({ where: { id: id } });
        const isEquipmentNull = !equipment;

        if (isEquipmentNull) {
            throw _getNotFoundEquipmentError();
        }
        await equipment.destroy();

        return true;
    },

    updateFields: async function (equipment) {
        try {
            const equipmentFromDatabase = await Equipment.findOne({
                where: { id: equipment.id }
            });
            _updateFields(equipmentFromDatabase, equipment);

            return await equipmentFromDatabase.save();
        } catch (error) {
            throw _getNotFoundEquipmentError();
        }
    }
}