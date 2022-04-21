const fs = require('fs');

module.exports = {

    getFilesName: function (path = String) {
        return fs
            .readdirSync(path)
            .filter(file => file.indexOf('index') == -1)
    },

    isEmptyArray: (array = Array) => !array || array.length === 0,

    exception: (message = String, errorCode = 400) => { message, errorCode },

}
