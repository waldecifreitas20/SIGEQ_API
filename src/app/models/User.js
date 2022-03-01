const {data, datatypes} = require('../../database/sequelize'); 
const Permission = require('./Permission');

const User = sequelize.define('user', {
    fullName : {
        type : datatypes.STRING,
        allowNull : false,
    },
    email : {
        type : datatypes.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : datatypes.STRING,
        allowNull : false,
    },
    cpf : {
        type : datatypes.STRING,
        allowNull : false,
        unique : true
    },
}, {
    hooks : {
        beforeSave : function(user) {
            console.log('usuario : ' + user);
        }
    }
}); 

User.belongsTo(Permission, {
    constraint : true,
    foreignKey : 'permissionId' 
});
    
User.sync();



module.exports = User;