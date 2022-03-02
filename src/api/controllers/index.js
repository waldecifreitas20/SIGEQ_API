const fs = require('fs');
const path = require('path');

module.exports = app => {
    fs
    .readdirSync(
        path.resolve('src','api','controllers')
    )
    .filter(file => 
        file.indexOf('index') == -1
    ).forEach(file => {
        require(
            path.resolve('src','api','controllers',file)
        )(app);
    });
};