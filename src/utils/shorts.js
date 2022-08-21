const fs = require('fs');

module.exports = {

    getFilesName: function (path = String) {
        return fs
            .readdirSync(path)
            .filter(file => file.indexOf('index') == -1)
    },

    isEmptyArray: array => !array || array.length === 0,

    isEmptyObject: object => Object.keys(object).length === 0,

    hasManyKeys: function (object = {}, keys = []) {
        let matchs = 0;
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (object.hasOwnProperty(key)) {
                matchs++;
            }
        }
        return matchs;
    },

    hasEmptyFields: function (object, requiredKeys) {
        for (const key of requiredKeys) {
            const value = `${object[key]}`.trim();

            if (!object[key] || value.length === 0) {
                return true;
            }
        }
        return false;
    },

    ROUTES: {
        '/equipment/all': {
            method: 'GET',
            hasParams: false,
            allowUrlQueries: true,
            permissionRequired : 'READ'
        },
        '/equipment/search': {
            method: 'POST',
            hasParams: false,
            UrlQueries: true,
            permissionRequired : 'READ'
        },
        '/equipment/create': {
            method: 'POST',
            hasParams: false,
            UrlQueries: false,
            permissionRequired : 'CREATE'
        },
        '/equipment/delete/': {
            method: 'DELETE',
            hasParams: false,
            UrlQueries: true,
            permissionRequired : 'DELETE'
        },
        '/equipment/update': {
            method: 'PUT',
            hasParams: false,
            UrlQueries: false,
            permissionRequired : 'UPDATE'
        },
        '/auth/authenticate': {
            method: 'POST',
            hasParams: false,
            UrlQueries: false,
        },
        '/auth/register': {
            method: 'POST',
            hasParams: false,
            UrlQueries: false,
        },
        '/auth/check_token': {
            method: 'POST',
            hasParams: false,
            UrlQueries: false,
        },

    }
}
