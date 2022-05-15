const paths = require('../../../utils/paths');
const { database, datatype } = require(paths.database);

const Status = database.define('status', {
  name: {
    type: datatype.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: datatype.STRING,
    unique: true,
    allowNull: false
  }
});

module.exports = Status