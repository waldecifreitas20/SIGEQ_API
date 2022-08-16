const fs = require('fs');

module.exports = {

    getFilesName: function (path = String) {
        return fs
            .readdirSync(path)
            .filter(file => file.indexOf('index') == -1)
    },

    isEmptyArray: array => !array || array.length === 0,

    isEmptyObject: object => Object.keys(object).length === 0,

    howManyKeys: function (object = {}, keys = []) {
        let matchs = 0;
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (object.hasOwnProperty(key)) {
                matchs++;
            }
        }
        return matchs;
    },

    hasEmptyFields : function (object, requiredKeys) {
        for (const key of requiredKeys) {
            const value = `${object[key]}`.trim();

            if (!object[key] || value.length === 0) {
                return true;
            }
        }
        return false;    
    },

    ROUTES: {
        GET: [
            '/equipment/all',
        ],
        POST: [
            '/equipment/search',
            '/equipment/create',
            '/auth/register',
            '/auth/authenticate',
            '/auth/check_token',
            '/auth/recovery_password',
        ],
        DELETE: [
            '/equipment/delete/'
        ],
        PUT: [
            '/equipment/update'
        ],

    }
}
