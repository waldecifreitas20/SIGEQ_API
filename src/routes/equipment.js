const services = require(require('../utils/paths').services.equipment);

module.exports = {
    getAll: async function (req, res) {
        const response = await services.getAllEquipment();
        return res.status(response.status).send(response);
    },

    getById: async function (req, res) {
        const { id } = req.params;
        const response = await services.getEquipmentByField({ id: id });
        return res.status(response.status).send(response);
    },

    create: async function (req, res) {
        const equipmentData = req.body;
        const response = await services.createEquipment(equipmentData);
        return res.status(response.status).send(response);
    },

    update: async function (req, res) {
        const equipmentData = req.body;

        const response = await services.updateEquipment(equipmentData);
        return res.status(response.status).send(response);
    },

    delete: async function (req, res) {
        const { equipment_id } = req.params;
        const response = await services.deleteEquipmentById(equipment_id);
        return res.status(response.status).send(response);
    },
}