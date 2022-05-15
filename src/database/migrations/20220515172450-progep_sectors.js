'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('progep_sectors', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      full_name: {
        type: Sequelize.STRING(80),
        unique: true,
        allowNull: false
      },
      short_name: {
        type: Sequelize.STRING(8),
        unique: true,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('progep_sectors');
  }
};
