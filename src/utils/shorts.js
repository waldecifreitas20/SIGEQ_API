const fs = require('fs');

module.exports = {

    getFilesName: function (path = String) {
        return fs
            .readdirSync(path)
            .filter(file => file.indexOf('index') == -1)
    },

    isEmptyArray: array  => !array || array.length === 0,

    isEmptyObject : object => Object.keys(object).length === 0,

    howManyKeys: function (object={}, keys=[]) {
        let matchs = 0;
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (object.hasOwnProperty(key)) {
                matchs++;
            }
        }
        return matchs;
    }
}
