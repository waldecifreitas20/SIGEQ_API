const paths = require('../../utils/paths');
const EquipmentModel = require(paths.models.equipment);

module.exports = {
    
    getEquipmentBy : async function(field) {
        const equipment = await EquipmentModel.findOne({ where : field});
        if (!equipment) {
            throw 'equipment not found';  
        }
        return equipment;
    },

    getAll : async function() {
        const all = await EquipmentModel.findAll();        
        if (all.length === 0) {
            throw 'cannot find any equipment into the database';  
        }
        return all;
    },

    create : async function(equipmentData) {
        return await EquipmentModel.create(equipmentData);
    },

    remove : async function(equipmentId) {
        return await EquipmentModel.findOne({id : equipmentId})
        .then(equipment => {
            equipment.destroy();
        });
    },
    
    update : async function(equipment) {
        return await EquipmentModel.findOne({id : equipment.id})
    }
}