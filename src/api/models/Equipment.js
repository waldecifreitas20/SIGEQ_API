const {database, datatype} = require('../../database/db'); 

const Equipment = database.define('equipment', {
    company : {
        type : datatype.STRING,
        allowNull : false
    },
    model : {
        type : datatype.STRING,
        allowNull : false
    },
    heritage : {
        type : datatype.STRING,
        allowNull : false,
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
    image : {
        type : datatype.BLOB,
        allowNull : true
    }
});
 

module.exports = Equipment;