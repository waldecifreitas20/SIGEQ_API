const paths = require('../../../utils/paths');
const {database, datatype} = require(paths.database); 
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
   
}, { timestamps : false});


module.exports = Permission; 
