const paths = require('../../../utils/paths');
const {database, datatype} = require(paths.database); 

const bcrypt = require('bcryptjs');

const User = database.define('user', {
    full_name : {
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
    timestamps : false,
    underscored : true,
    hooks : {
        beforeSave : function(user) {
            const hash = bcrypt.hashSync(user.password, 10);
            user.password = hash;
        }
    }
}); 

module.exports = User;