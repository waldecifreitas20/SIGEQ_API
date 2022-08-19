'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('manufacturers', [{
      fullName: 'Hewllett-Packard',
      shortName: 'HP',
    }], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('manufacturers', null, {});
  }
};
