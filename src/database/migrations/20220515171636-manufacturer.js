'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('manufacturers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      full_name: {
        type: Sequelize.STRING(40),
        unique: true,
        allowNull: false
      },
      short_name: {
        type: Sequelize.STRING(10),
        unique: true,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('manufacturers');
  }
};
