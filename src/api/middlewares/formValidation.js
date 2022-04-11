const _isEmptyObject = (object) => {
    try {
        const keysExpected = ['status', 'current_location', 'image'];

        keysExpected.forEach(key => {
            if (object.hasOwnProperty(key)) {
                return false;
            }
        });
    } catch (error) {
        return true;
    }
};

const _invalidsParamsMessageError = (validParamsExpected, validParamsreceived) => {
    return `expected to receive ${validParamsExpected} valid params. But, was given ${validParamsreceived}`;
}

const _hasManyKeysExpected = (keysExpected, object) => {
    let matchs = 0;

    keysExpected.forEach(key => {
        if (object.hasOwnProperty(key)) {
            ++matchs;
        }
    });

    return matchs;
};

module.exports = {
    register: function (req, res, next) {
        const user = req.body;
        let keysExpected = [
            'first_name',
            'surname',
            'email',
            'password',
            'cpf',
        ];

        let matchs = _hasManyKeysExpected(keysExpected, user);

        if (matchs != keysExpected.length) {
            return res.status(400).send({
                status: 400,
                error: _invalidsParamsMessageError(keysExpected.length, matchs)
            });
        }

        return next();
    },

    login: function (req, res, next) {
        const user = req.body;
        let keysExpected = ['email', 'password'];
        let matchs = _hasManyKeysExpected(keysExpected, user);

        if (matchs != keysExpected.length) {
            return res.status(400).send({
                status: 400,
                error: _invalidsParamsMessageError(keysExpected.length, matchs)
            });
        }
        return next();
    },

    equipment: function (req, res, next) {
        const equipment = req.body;
        const isEmpty = _isEmptyObject(equipment);

        if (isEmpty) {
            return res.status(400).send({ error: 'no params received' });
        }

        return next();
    }
};