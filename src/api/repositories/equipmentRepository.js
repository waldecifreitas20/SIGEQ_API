const paths = require('../../utils/paths');
const EquipmentModel = require(paths.models.equipment);

module.exports = {
    
    getEquipmentBy : async (field) => {
        const equipment = await EquipmentModel.findOne({ where : field});
        if (!equipment) {
            throw 'equipment not found';  
        }
        return equipment;
    },

    getAll : async () => {
        const all = await EquipmentModel.findAll();
        
        if (all.length === 0) {
            throw 'cannot find any equipment into the database';  
        }
        return all;
    },

    create : async (equipmentData) => {
        return await EquipmentModel.create(equipmentData);
    },

    remove : () => {},
    update : () => {},
}