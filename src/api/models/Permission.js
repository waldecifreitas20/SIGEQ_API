const {sequelize, datatypes} = require('../../database/sequelize'); 

const Permission = sequelize.define('permission', {
    add : {
        type : datatypes.BOOLEAN,
        allowNull : true,
        default : false
    },
    edit : {
        type : datatypes.BOOLEAN,
        allowNull : true,
        default : false
    },
    delete : {
        type : datatypes.BOOLEAN,
        allowNull : true,
        default : false
    },
    read : {
        type : datatypes.BOOLEAN,
        allowNull : true,
        default : true
    },
   
});
 
Permission.sync();

module.exports = Permission; 