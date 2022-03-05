const { controllers } = require('../../utils/paths');

module.exports = app => {
    require('../../utils/finder')
    .getFilesName(controllers.index)
    .forEach(file => {
        require(`${controllers.index}/${file}`)(app);
    });
};