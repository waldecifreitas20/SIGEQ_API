const fs = require('fs');

module.exports = {
    getFilesName: function (path) {
        return fs
            .readdirSync(path)
            .filter(file => file.indexOf('index') == -1)
    },

    isEmptyArray: function (array, exception = 'array is empty') {

        if (!array || array.length === 0) {
            throw exception;
        }
        return array;
    },

    isEmptyObject: function (keysExpected, object, exception='is empty object') {
        let matchs = 0;

        keysExpected.forEach(key => {
            if (object.hasOwnProperty(key)) {
                ++matchs;
            }
        });

        if (matchs === keysExpected.length) return object
        
        return exception;
    }


}
