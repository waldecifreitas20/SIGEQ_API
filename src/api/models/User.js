const {sequelize, datatype} = require('../../database/sequelize'); 

const Permission = require('./Permission');


const User = sequelize.define('user', {
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

User.belongsTo(Permission, {
    constraint : true,
    foreignKey : 'user_id'
});

Permission.hasMany(User, {
    foreignKey : 'user_id'
});

module.exports = User;