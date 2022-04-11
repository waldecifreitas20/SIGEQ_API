const paths = require('../../../utils/paths');
const { database, datatype } = require(paths.database); 

const Equipment = database.define('equipments', {
    company : { 
        type : datatype.STRING,
        allowNull : false
    },
    category : {
        type : datatype.STRING,
        allowNull : false
    },
    model : {
        type : datatype.STRING,
        allowNull : false
    },
    heritage : {
        type : datatype.STRING,
        unique : true
    },
    current_location : {
        type : datatype.STRING,
        allowNull : false,
    },
    status : {
        type : datatype.STRING,
        allowNull : false,
        default : false
    },
    warrantyExpireAt : {
        type : datatype.DATE
    },
    image : {
        type : datatype.BLOB,
        allowNull : true
    }
}, {
    timestamps : false
});
 

module.exports = Equipment;