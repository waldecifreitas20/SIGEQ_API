const paths = require('../../utils/paths');
const EquipmentModel = require(paths.models.equipment);
const { isEmptyObject } = require('../../utils/shorts');


module.exports = {
    
    getEquipmentBy : async function(field) {
        const equipment = await EquipmentModel.findOne({ where : field});
        return isEmptyObject(equipment, 'equipment not found');
    },

    getAll : async function() {
        const all = await EquipmentModel.findAll();        
        return isEmptyObject(all, 'cannot find any equipment into the database');
    },

    create : async function(equipment) {
        return await EquipmentModel.create(equipment);
    },

    remove : async function(id) {
        const equipment = await EquipmentModel.findOne({
            where : {id : id}
        });
        return await equipment.destroy();
    },
    
    update : async function(id) {
        return await EquipmentModel.findOne({where : {id : id}})
    }
}