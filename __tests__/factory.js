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

module.exports = {
    generateUser : () => {
        return {
            full_name : faker.name.findName(),
            email : faker.internet.email(),
            password : faker.internet.password(),
            cpf : faker.br.cpf()
        };
    },

    generateEquipment : () => {
        return {
            company : faker.company.companyName(),
            category : faker.commerce.product(),
            model : faker.commerce.product(),
            heritage : faker.br.cpf(),
            current_location : PROGEP_SECTORS[0],
            status : 'it is avaiable',
            warrantyExpireAt : Date.now(),
            image : faker.random.image()
        }
    },

    generatePermissions : (
        create=false, 
        remove=false, 
        read=false, 
        update=false
    ) => {
        return {
            permissions : [
                {}
            ]
        }
    }
}