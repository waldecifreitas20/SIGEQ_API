const { models, utils } = require('../../utils/paths');
const { getFilesName } = require(utils.shorts);

module.exports = folder => getFilesName(`${models.index}/${folder}`);