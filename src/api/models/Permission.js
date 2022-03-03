const {database, datatype} = require('../../database/db'); 

const User = require('./User');

const Permission = database.define('permission', {
    name : {
        type : datatype.STRING,
        allowNull : false
    },
    description : {
        type : datatype.STRING,
        allowNull : false
    }
   
}, { timestamps : true});


module.exports = Permission; 
