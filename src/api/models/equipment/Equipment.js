const paths = require('../../../utils/paths');
const { database, datatype } = require(paths.database);

module.exports = database.define('equipments', {
    title: {
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
    warrantyExpiresAt: {
        type: datatype.DATE,
        allowNull: true
    },
    image: {
        type: datatype.BLOB,
        allowNull: true
    }
});


