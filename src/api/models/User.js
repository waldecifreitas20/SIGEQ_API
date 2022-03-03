const {database, datatype} = require('../../database/db'); 

const Permission = require('./Permission');

const User = database.define('user', {
    fullName : {
        type : datatype.STRING,
        allowNull : false,
    },
    email : {
        type : datatype.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : datatype.STRING,
        allowNull : false,
    },
    cpf : {
        type : datatype.STRING,
        allowNull : false,
        unique : true
    },
}, {
    timestamps : true, 
    hooks : {
        beforeSave : function(user) {
            console.log('usuario pass : ' + user.password);
        }
    }
}); 



module.exports = User;