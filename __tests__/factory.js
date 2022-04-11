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

const _getRandomSector = () => {
    const i = Math.floor(Math.random() * PROGEP_SECTORS.length);
    return PROGEP_SECTORS[i];
}
const setPermission = (name) => {
    return {
        name,
        description : '---'
    };
}


module.exports = {
    generateUser : () => {
        return {
            first_name : faker.name.firstName(),
            surname : faker.name.lastName(),
            email : faker.internet.email(),
            password : faker.internet.password(),
            cpf : faker.br.cpf(),
        };
    },

    generateEquipment : () => {
        return {
            company : faker.company.companyName(),
            category : faker.commerce.product(),
            model : faker.commerce.product(),
            heritage : faker.br.cpf(),
            current_location : _getRandomSector(),
            status : 'it is available',
            warrantyExpireAt : Date.now(),
            image : faker.random.image()
        }
    },

    generatePermissions : ({read=true, create=true, update=true, remove=true}) => {
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