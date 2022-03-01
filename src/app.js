const express = require('express');

class App {
    constructor() {
        this.app = express();
    }
    init() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended : false}));
    }
}

module.exports = new App().app;