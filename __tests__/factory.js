const faker = require('faker-br');

const PROGEP_SECTORS = [
    'CSA',
    'ATI',
    'CAP',
    'CRMP',
    'CATEC',
    'CRCAP',
    'GESTAO',
    'SECRETARIA',
];

const models = ['SF34-MJ', 'M78-GHJ', 'CP4J-Q'];

const _getRandomIntegerUntil = (number) => {
    return Math.floor(Math.random() * number);
}

const _getRandomFrom = (array) => {
    let i = _getRandomIntegerUntil(array.length - 1);
    return array[i];
}

const setPermission = (name) => {
    return {
        name,
        description: '---'
    };
}

module.exports = {
    generateUser: () => {
        return {
            firstName: faker.name.firstName(),
            surname: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            cpf: faker.br.cpf(),
        };
    },

    generateEquipment: () => {
        return {
            title: "Computador HP",
            manufacturerId: "1",
            categoryId: "1",
            model: "15-cdf",
            heritage : "456132456",
            locationId: "1",
            statusId: "1",
            warrantyExpiresAt: null,
            image: "454-6-564-654"
        }
    },

    generatePermissions: ({ read = true, create = true, update = true, remove = true }) => {
        let permissions = [];
        if (read) {
            permissions.push(setPermission('read'));
        }
        if (create) {
            permissions.push(setPermission('create'));
        }
        if (update) {
            permissions.push(setPermission('update'));
        }
        if (remove) {
            permissions.push(setPermission('delete'));
        }

        return permissions;
    }
}