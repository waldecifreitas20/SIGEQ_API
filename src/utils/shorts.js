const fs = require('fs');

module.exports = {

    getFilesName: function (path = String) {
        return fs
            .readdirSync(path)
            .filter(file => file.indexOf('index') == -1)
    },

    isEmptyArray: (array = Array) => !array || array.length === 0,

}
