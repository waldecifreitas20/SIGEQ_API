const paths = require('../../../utils/paths');
const {database, datatype} = require(paths.database); 
const User = require('./User');

const Permission = database.define('permission', {
    name : {
        type : datatype.STRING(7),
        allowNull : false
    },
    description : {
        type : datatype.STRING(20),
        allowNull : false
    }
   
});


module.exports = Permission; 
