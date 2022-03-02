const fs = require('fs');
const path = require('path');

module.exports = app => {
    fs
    .readdirSync(
        path.resolve('src','app','controllers')
    )
    .filter(file => 
        file.indexOf('index') == -1
    ).forEach(file => {
        require(
            path.resolve('src','app','controllers',file)
        )(app);
    });
};