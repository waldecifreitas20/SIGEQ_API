const services = require(require('../../utils/paths').services.auth);

module.exports = {
    register: async (req, res) => {
        const userData = req.body;
        var response = await services.register(userData);

        return res.status(response.status).send(response);
    },

    authenticate: async (req, res) => {
        const { email, password } = req.body;
        var response = await services.login(email, password);

        return res.status(response.status).send(response);
    },

    check_token: (req, res) => {
        return res.status(200).send({ message: 'valid token' });
    }
}