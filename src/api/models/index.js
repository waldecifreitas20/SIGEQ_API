const path = require('path');
const { getModulesPathByFolder } = require(path.resolve('src', 'utils', 'finder.js'));

module.exports = getModulesPathByFolder('models');