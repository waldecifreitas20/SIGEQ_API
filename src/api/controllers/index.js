const { controllers } = require('../../utils/paths');

module.exports = app => {
    const { getFilesName } = require('../../utils/shorts');

    getFilesName(controllers.index).forEach(file => {
        require(`${controllers.index}/${file}`)(app);
    });
    
};