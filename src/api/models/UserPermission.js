const {database, datatype} = require('../../database/db'); 

const UserPermission = database.define('user_permission', {
    id : {
        type : datatype.INTEGER,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
    }   
});

module.exports = UserPermission; 