const { routes } = require('../utils/paths');
const { getFilesName } = require('../utils/shorts');

module.exports = app => {   
    getFilesName(routes.index).forEach(file => {
        require(`${routes.index}/${file}`)(app);
    });
};