const { getErrorCode } = require('../../utils/errors');
const { utils, models } = require('../../utils/paths');

const Category = require(models.category);
const Status = require(models.status);
const Manufacturer = require(models.manufacturer);
const Location = require(models.location);
const Equipment = require(models.equipment);

const { isEmptyArray, isEmptyObject } = require(utils.shorts);
const { getErrorResponse, getErrorDescription } = require(utils.errors);


const _getNotFoundEquipmentError = (description = 'equipment might be not registered yet') => {
    return getErrorResponse({
        status: 400,
        error: 'cannot find equipment',
        description
    });
}
const _updateFields = (model, equipment) => {

    const fieldsToUpdate = Object.keys(equipment);

    for (let i = 0; i < fieldsToUpdate.length; i++) {
        let field = fieldsToUpdate[i];
        const isUniqueKey = (field == 'id') || (field == 'heritage');

        if (!isUniqueKey) {
            model[field] = equipment[field];
        }
    }
}

module.exports = {

    getEquipmentsBy: async function (field) {
        let equipments = null;
        try {
            equipments = await Equipment.findAll({ where: field });
        } catch (error) {
            const errorDescription = getErrorDescription(error);
            throw _getNotFoundEquipmentError(errorDescription);
        }

        if (isEmptyArray(equipments) || isEmptyObject(field)) {
            throw _getNotFoundEquipmentError();
        }

        return equipments;
    },

    getAll: async function () {
        const allEquipments = await Equipment.findAll();
        if (isEmptyArray(allEquipments)) {
            throw _getNotFoundEquipmentError('database might be empty or unable to reach it');
        }
        return allEquipments;
    },

    create: async function (equipment) {
        try {
            const equipmentFromDatabase = await Equipment.create(equipment, {
                include: [Category, Status, Manufacturer, Location]
            });
            return equipmentFromDatabase.id;
        } catch (error) {
            throw getErrorResponse({
                status: 400,
                error: 'cannot create equipment',
                description: getErrorDescription(error),
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
            const isEquipmentNull = !equipmentFromDatabase;

            if (isEquipmentNull) {
                throw '21000';
            }
            _updateFields(equipmentFromDatabase, equipment);

            return await equipmentFromDatabase.save();
        } catch (error) {
            const errorCode = getErrorCode(error);

            throw getErrorResponse({
                error: 'cannot update equipment',
                description: getErrorDescription(errorCode)
            });

        }

    }
}