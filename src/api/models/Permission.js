const {sequelize, datatype} = require('../../database/sequelize'); 

const UserPermission = require('./UserPermission');
const User = require('./User');
const { hashSync } = require('bcryptjs');

const Permission = sequelize.define('permission', {
    name : {
        type : datatype.STRING,
        allowNull : false
    },
    description : {
        type : datatype.STRING,
        allowNull : false
    }
   
}, { timestamps : true});

Permission.belongsTo(User, {
    constraint : true,
    foreignKey : 'user_id'
});

User.hasMany(Permission, {
    foreignKey : 'user_id'
});

Produto.belongsToMany(Permission, {
    through : {
        model : UserPermission
    },
    foreignKey : 'permission_id',
    constraint : true
});
 

Permission.belongsToMany(User, {
    through : {
        model : UserPermission
    },
    foreignKey : 'permission_id',
    constraint : true
});
 
Permission.sync({ force : true });
User.sync({force : true});


UserPermission.sync({force : true})

module.exports = Permission; 
