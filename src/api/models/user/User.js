const paths = require('../../../utils/paths');
const { database, datatype } = require(paths.database);

const bcrypt = require('bcryptjs');

const User = database.define('users', {
    firstName: {
        type: datatype.STRING(20),
        allowNull: false,
    },
    surname: {
        type: datatype.STRING(20),
        allowNull: false,
    },
    email: {
        type: datatype.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: datatype.STRING,
        allowNull: false,
    },
    cpf: {
        type: datatype.STRING(11),
        allowNull: false,
        unique: true
    },
}, {
    hooks: {
        beforeSave: function (user) {
            const hash = bcrypt.hashSync(user.password, 10);
            user.password = hash;
        }
    }
});

module.exports = User;