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


const _getRandomFrom = (array) => {
    let i = Math.floor(Math.random() * array.length);
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
            first_name: faker.name.firstName(),
            surname: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            cpf: faker.br.cpf(),
        };
    },

    generateEquipment: () => {
        return {
            title: faker.commerce.product(),
            company: faker.company.companyName(),
            category: faker.commerce.product(),
            model: _getRandomFrom(models),
            heritage: faker.br.cpf(),
            current_location: _getRandomFrom(PROGEP_SECTORS),
            status: 'it is available',
            warrantyExpireAt: Date.now(),
            image: faker.random.image()
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