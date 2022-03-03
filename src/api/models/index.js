const path = require('path');
const { getFilesName } = require(path.resolve('src', 'utils', 'finder.js'));

module.exports = getFilesName(path.resolve('src', 'api', 'models'));