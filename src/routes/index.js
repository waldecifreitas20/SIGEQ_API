const { routes } = require('../utils/paths');

module.exports = app => {
    const { getFilesName } = require('../utils/shorts');

    getFilesName(routes.index).forEach(file => {
        require(`${routes.index}/${file}`)(app);
    });
    
};