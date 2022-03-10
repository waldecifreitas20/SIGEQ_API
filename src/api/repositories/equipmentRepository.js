const paths = require('../../utils/paths');
const EquipmentModel = require(paths.models.equipment);
const { isNull } = require(paths.functions.shorts);

async function getEquipmentBy(field={}) {
    try {
        const equipment = await  EquipmentModel.findOne({ where : field }); 
        if(!equipment) {
            throw 'equipment not found';
        }
        return equipment;
    } catch (error) {
        throw error;
    }    
}

module.exports = {
    getEquipmentBy : getEquipmentBy
}