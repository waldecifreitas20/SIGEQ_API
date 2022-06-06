'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('locations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      fullName: {
        type: Sequelize.STRING(80),
        unique: true,
        allowNull: false
      },
      shortName: {
        type: Sequelize.STRING(8),
        unique: true,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('locations');
  }
};
