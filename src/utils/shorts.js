const fs = require('fs');

module.exports = {
    getFilesName: function (path = String) {
        return fs
            .readdirSync(path)
            .filter(file => file.indexOf('index') == -1)
    },

    isEmptyArray: (array = Array) => !array || array.length === 0,

    hasKeys: function (keysExpected = Array, object = Object) {
        let matchs = 0;

        keysExpected.forEach(key => {
            if (object.hasOwnProperty(key)) {
                ++matchs;
            }
        });

        return matchs === keysExpected.length;
    },

    throwException(error = String, code = 400) {
        throw { error, code };
    }


}
