const {sequelize, datatype} = require('../../database/sequelize'); 

const UserPermission = sequelize.define('user_permission', {
    id : {
        type : datatype.INTEGER,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
    }   
});


 
module.exports = UserPermission; 