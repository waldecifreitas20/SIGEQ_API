const paths = require('../../../utils/paths');
const Equipment = require('./Equipment');
const { database, datatype } = require(paths.database);

const Category = database.define('categories', {
  name: {
    type: datatype.STRING(20),
    allowNull: false,
    unique: true
  }
});


Category.hasMany(Equipment);
Equipment.belongsTo(Category);

module.exports = Category;