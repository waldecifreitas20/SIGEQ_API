const {sequelize, datatypes} = require('../../database/sequelize'); 

const Equipment = sequelize.define('equipment', {
    company : {
        type : datatypes.STRING,
        allowNull : false
    },
    model : {
        type : datatypes.STRING,
        allowNull : false
    },
    heritage : {
        type : datatypes.STRING,
        allowNull : false,
        unique : true
    },
    current_location : {
        type : datatypes.STRING,
        allowNull : false,
    },
    avaiable : {
        type : datatypes.BOOLEAN,
        allowNull : false,
        default : false
    },
    image : {
        type : datatypes.BLOB,
        allowNull : true
    }
});
 
Equipment.sync({force : true});

module.exports = Equipment;