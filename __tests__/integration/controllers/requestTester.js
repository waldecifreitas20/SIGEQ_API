const { resolve : getpath} = require('path');
const request = require('supertest')
const app = require(getpath('src', 'app.js'));

module.exports = {
    post : async function({route='/', body={}, headers={}}) {
        return await request(app)
        .post(route)
        .send(body)
        .set(headers);
    },

}