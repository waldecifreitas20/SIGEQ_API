const { Op } = require('sequelize');
const { getErrorCode, ERROR_CODE } = require('../../utils/errors');
const { utils, models } = require('../../utils/paths');

const Category      = require(models.category);
const Status        = require(models.status);
const Manufacturer  = require(models.manufacturer);
const Location      = require(models.location);
const Equipment     = require(models.equipment);

const { isEmptyArray, isEmptyObject } = require(utils.shorts);
const { getErrorResponse, getErrorDescription } = require(utils.errors);


const _getNotFoundEquipmentError = ({ code, description = 'equipment might be not registered yet' }) => {
    return getErrorResponse({
        status: 400,
        code,
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
            const errorCode = getErrorCode(error);
            throw _getNotFoundEquipmentError({
                code: errorCode,
                description: getErrorDescription(errorCode)
            });
        }

        if (isEmptyArray(equipments) || isEmptyObject(field)) {
            throw _getNotFoundEquipmentError({
                code: ERROR_CODE.EQUIPMENT.NOT_REGISTERED
            });
        }

        return equipments;
    },

    getAll: async function (startId) {
        let allEquipments = [];
        try {
            allEquipments = await Equipment.findAll({
                where : { id : { [Op.gt] : startId}},
                limit : 10
            });
            if (isEmptyArray(allEquipments)) {
                throw ERROR_CODE.EQUIPMENT.NOT_REGISTERED
            }
            return allEquipments;
        } catch (error) {

            console.log(error);
            const errorCode = getErrorCode(error);
            throw _getNotFoundEquipmentError({
                code: errorCode,
                description: getErrorDescription(errorCode)
            });
        }
    },

    create: async function (equipment) {
        try {
            const equipmentFromDatabase = await Equipment.create(equipment, {
                include: [Category, Status, Manufacturer, Location]
            });
            return equipmentFromDatabase.id;
        } catch (error) {
            const errorCode = getErrorCode(error)
            throw getErrorResponse({
                code: getErrorCode(error),
                error: 'cannot create equipment',
                description: getErrorDescription(errorCode),
            });
        }
    },

    remove: async function (id) {
        let equipment = null;
        try {
            equipment = await Equipment.findOne({ where: { id: id } });
        } catch (error) {
            const errorCode = ERROR_CODE.EQUIPMENT.INVALID_ID;
            throw getErrorResponse({
                status: 400,
                code: errorCode,
                error: 'invalid id sent',
                description: getErrorDescription(errorCode)
            });
        }
        if (equipment !== null) {
            await equipment.destroy();
            return true;
        }
        throw _getNotFoundEquipmentError({
            code: ERROR_CODE.EQUIPMENT.NOT_REGISTERED
        });
    },

    updateFields: async function (equipment) {
        try {
            const equipmentFromDatabase = await Equipment.findOne({
                where: { id: equipment.id }
            });
            const isEquipmentNull = !equipmentFromDatabase;

            if (isEquipmentNull) {
                throw ERROR_CODE.EQUIPMENT.NOT_REGISTERED;
            }
            _updateFields(equipmentFromDatabase, equipment);

            return await equipmentFromDatabase.save();
        
        } catch (error) {

            const errorCode = getErrorCode(error);
            throw getErrorResponse({
                code: errorCode,
                error: 'cannot update equipment',
                description: getErrorDescription(errorCode)
            });

        }

    }
}