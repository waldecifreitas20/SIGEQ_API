const paths = require('../../../utils/paths');
const { database, datatype } = require(paths.database);

const bcrypt = require('bcryptjs');

const User = database.define('users', {
    first_name: {
        type: datatype.STRING(10),
        allowNull: false,
    },
    surname: {
        type: datatype.STRING(10),
        allowNull: false,
    },
    email: {
        type: datatype.STRING(40),
        allowNull: false,
        unique: true
    },
    password: {
        type: datatype.STRING(50),
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