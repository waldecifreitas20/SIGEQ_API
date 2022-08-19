const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('../config/dotenv');

module.exports = {

    generateToken: function (userData) {
        return jwt.sign(userData, process.env.API_SECRET, {
            expiresIn: 3600
        });
    },

    checkToken: function (token) {
        return jwt.verify(token, process.env.API_SECRET);
    },

    isPasswordEqualsHash: function (password, hash) {
        try {
            return bcrypt.compareSync(password, hash);
        } catch (error) {
            return false;
        }
    }
}