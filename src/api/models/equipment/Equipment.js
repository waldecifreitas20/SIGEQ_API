const paths = require('../../../utils/paths');
const { database, datatype } = require(paths.database);

module.exports = database.define('equipments', {
    title: {
        type: datatype.STRING(30),
        allowNull: false
    },
    model: {
        type: datatype.STRING(15),
        allowNull: false
    },
    heritage: {
        type: datatype.STRING(10),
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


