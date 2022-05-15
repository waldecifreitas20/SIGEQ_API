'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_permissions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users',
            schema: 'public'
          },
          key: 'id',
        }
      },
      permission_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'permissions',
            schema: 'public'
          },
          key: 'id',
        }
      },


    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_permissions');
  }
};
