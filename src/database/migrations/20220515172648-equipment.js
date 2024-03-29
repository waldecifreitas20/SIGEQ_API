'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('equipments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      model: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
      heritage: {
        type: Sequelize.STRING(10),
        unique: true,
        allowNull: true
      },
      warrantyExpiresAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      image: {
        type: Sequelize.BLOB,
        allowNull: true
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'categories',
            scheme: 'public'
          },
          key: 'id'
        },
      },
      manufacturerId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'manufacturers',
            scheme: 'public'
          },
          key: 'id'
        }
      },
      locationId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'locations',
            scheme: 'public'
          },
          key: 'id'
        }
      },
      statusId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'status',
            scheme: 'public'
          },
          key: 'id'
        }
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('equipments');
  }
};
