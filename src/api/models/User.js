const {database, datatype} = require('../../database/db'); 
const bcrypt = require('bcryptjs');

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
            const hash = bcrypt.hashSync(user.password, 10);
            user.password = hash;
        }
    }
}); 

module.exports = User;