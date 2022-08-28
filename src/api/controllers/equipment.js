const services = require(
    require('../../utils/paths').services.equipment
);


module.exports = {
    getAll: async function (req, res) {
        const {start_id, limit} = req.query;
        const response = await services.getAllEquipment(start_id, limit);
        return res.status(response.status).send(response);
    },

    search: async function (req, res) {
        const searchParams = {
            equipmentFields : req.body,
            limit : req.query.limit || 10
        }
        const response = await services.getEquipmentsByFields(searchParams);
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
        const { id } = req.query;
        const response = await services.deleteEquipmentById(id);

        return res.status(response.status).send(response);
    },
}