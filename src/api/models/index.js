const {resolve : getPath } = require('path');
const { models } = require(getPath('src', 'utils', 'paths'));
const { getFilesName } = require(getPath('src', 'utils', 'shorts.js'));

module.exports = folder => getFilesName(`${models.index}/${folder}`);