'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('locations', [{
      fullName: 'Coordenadoria de Analise Tecnica',
      shortName: 'CATEC',
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('People', null, {});
  }
};
