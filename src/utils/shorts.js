const fs = require('fs');

module.exports = {
    getFilesName: function (path) {
        return fs
            .readdirSync(path)
            .filter(file => file.indexOf('index') == -1)
    },

    isEmptyArray: function (array, exception = 'Object is empty') {
        if (!object || object.length === 0) {
            throw exception;
        }
        return object;
    },
}
