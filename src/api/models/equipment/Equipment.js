const paths = require('../../../utils/paths');
const { database, datatype } = require(paths.database);

module.exports = database.define('equipments', {
    title: {
        type: datatype.STRING,
        allowNull: false
    },
    company: {
        type: datatype.STRING,
        allowNull: false
    },
    category: {
        type: datatype.STRING,
        allowNull: false
    },
    model: {
        type: datatype.STRING,
        allowNull: false
    },
    heritage: {
        type: datatype.STRING,
        unique: true,
        allowNull: true
    },
    current_location: {
        type: datatype.STRING,
        allowNull: false,
    },
    warrantyExpiresAt: {
        type: datatype.DATE,
        allowNull: true
    },
    image: {
        type: datatype.BLOB,
        allowNull: true
    }
});


