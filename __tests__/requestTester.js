const { resolve: getpath } = require('path');
const request = require('supertest')
const app = require(getpath('src', 'app.js'));

module.exports = {
    post: async function ({ route = '/', body = {}, headers = {} }) {
        return await request(app)
            .post(route)
            .send(body)
            .set(headers);
    },

    get: async function ({ route = '/', headers = {} }) {
        return await request(app)
            .get(route)
            .set(headers);
    },

    delete: async function ({ route = '/delete', headers = {} }) {
        return await request(app)
            .delete(route)
            .set(headers);
    },

    put: async function ({ route = '/', body = {}, headers = {} }) {
        return await request(app)
            .put(route)
            .send(body)
            .set(headers);
    },
}