const fs = require('fs');

module.exports = {
    getFilesName : (path) => {              
        return fs 
            .readdirSync(path)
            .filter(file => file.indexOf('index') == -1)
    }
}
