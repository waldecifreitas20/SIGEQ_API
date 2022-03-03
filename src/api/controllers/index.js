const fs = require('fs');
const path = require('path');

module.exports = app => {
    require('../../utils/finder')
    .getFilesName(path.resolve('src', 'api', 'controllers'))
    .forEach(file => {
        require(
            path.resolve('src','api','controllers',file)
        )(app);
    });
};