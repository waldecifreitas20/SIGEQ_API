const paths = require('../../../utils/paths');
const { database, datatype } = require(paths.database);

const Equipment = require('./Equipment');

const Manufacturer = database.define('manufacturers', {
  full_name: {
    type: datatype.STRING(40),
    unique: true,
    allowNull: false
  },
  short_name: {
    type: datatype.STRING(10),
    unique: true,
    allowNull: false
  }
});

Manufacturer.hasMany(Equipment);
Equipment.belongsTo(Manufacturer);

module.exports = Manufacturer;