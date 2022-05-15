const paths = require('../../../utils/paths');
const Equipment = require('./Equipment');
const { database, datatype } = require(paths.database);

const ProgepSector = database.define('progep_sectors', {
  full_name: {
    type: datatype.STRING(80),
    unique: true,
    allowNull: false
  },
  short_name: {
    type: datatype.STRING(8),
    unique: true,
    allowNull: false
  }
});

ProgepSector.hasMany(Equipment);
Equipment.belongsTo(ProgepSector);

module.exports = ProgepSector;