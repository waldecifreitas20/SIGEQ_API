const path = require('path');
const fs = require('fs');

module.exports = {
    getModulesPathByFolder : (folder) => {              
        let directory = path.resolve('src', 'api', folder);
        return fs 
            .readdirSync(directory)
            .filter(file => file.indexOf('index') == -1)
    }
}
