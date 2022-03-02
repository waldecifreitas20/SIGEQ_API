const express = require('express');
const router =  express.Router();

router.get('/', (req, res) => {
    return res.send({ ok : 'route get'})
});

module.exports = app => {
    app.use('/auth', router);
}