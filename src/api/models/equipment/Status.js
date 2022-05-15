const paths = require('../../../utils/paths');
const { database, datatype } = require(paths.database);

const Equipment = require('./Equipment');

const Status = database.define('status', {
  name: {
    type: datatype.STRING(15),
    unique: true,
    allowNull: false
  },
  description: {
    type: datatype.STRING(30),
    unique: true,
    allowNull: false
  }
});

Status.hasMany(Equipment);
Equipment.belongsTo(Status);

module.exports = Status;