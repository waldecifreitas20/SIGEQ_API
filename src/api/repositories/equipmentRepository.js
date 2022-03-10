const paths = require('../../utils/paths');
const EquipmentModel = require(paths.models.equipment);

async function getEquipmentBy(field={}) {
    const equipment = await EquipmentModel.findOne({ where : field }).catch(err => {
        throw err;
    }); 
 
    if(!equipment) {
        throw 'equipment not found';
    }
 
    return equipment;
}

module.exports = {
    getEquipmentBy : getEquipmentBy
}