const isEmptyObject = (object) => {
    try {
        const keys = ['status', 'current_location', 'image']; 
        for (const key of keys) {
            console.log(object.hasOwnProperty(key));
            if (object.hasOwnProperty(key)) {
                return false;
            } 
        }
    } catch (error) { 
        return true;
    }
}

module.exports = {
    register: function (req, res, next) {
        const user = req.body;
        let receivedParams = 4;

        if (!user.full_name) {
            --receivedParams;
        }
        if (!user.email) {
            --receivedParams;
        }
        if (!user.password) {
            --receivedParams;
        }
        if (!user.cpf) {
            --receivedParams;
        }

        if (receivedParams < 4) {
            return res.status(400).send({
                status: 400,
                error: 'expected to receive 4 params. But, was given ' + receivedParams
            });
        }

        return next();
    },

    login: function (req, res, next) {
        const user = req.body;
        let receivedParams = 2;

        if (!user.email) {
            --receivedParams;
        }
        if (!user.password) {
            --receivedParams;
        }

        if (receivedParams < 2) {
            return res.status(400).send({
                status: 400,
                error: 'expected to receive 2 params. But, was given ' + receivedParams
            });
        }
        return next();
    },

    equipment: function (req, res, next) {
        const equipment = req.body;
        const isEmpty = isEmptyObject(equipment);
        console.log(isEmpty);
        if (isEmpty) {
            return res.status(400).send({ error: 'no params received' });
        }

        return next();
    }
};