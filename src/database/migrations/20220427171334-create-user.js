'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: datatype.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: {
        type: datatype.STRING,
        allowNull: false,
      },
      surname: {
        type: datatype.STRING,
        allowNull: false,
      },
      email: {
        type: datatype.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: datatype.STRING,
        allowNull: false,
      },
      cpf: {
        type: datatype.STRING,
        allowNull: false,
        unique: true
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
