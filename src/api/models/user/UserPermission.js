const paths = require('../../../utils/paths');
const { database, datatype } = require(paths.database);

const User = require('./User');
const Permission = require('./Permission');

const UserPermission = database.define('user_permissions', {
    id: {
        type: datatype.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
});

User.belongsToMany(Permission, {
    through: {
        model: UserPermission
    },
    constraint: true,
    foreignKey: 'userId'
});

Permission.belongsToMany(User, {
    through: {
        model: UserPermission
    },
    constraint: true,
    foreignKey: 'permissionId'
});


module.exports = UserPermission; 