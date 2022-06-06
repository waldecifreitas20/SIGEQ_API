const paths = require('../../../utils/paths');
const Equipment = require('./Equipment');
const { database, datatype } = require(paths.database);

const Location = database.define('locations', {
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

Location.hasMany(Equipment);
Equipment.belongsTo(Location);

module.exports = Location;