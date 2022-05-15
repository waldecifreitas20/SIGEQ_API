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
        type: Sequelize.STRING,
        allowNull: false
      },
      model: {
        type: Sequelize.STRING,
        allowNull: false
      },
      heritage: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
      },
      warranty_expires_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      image: {
        type: Sequelize.BLOB,
        allowNull: true
      },

      status_id: {
        type: Sequelize.INTEGER,
        references: {
          model : {
            tableName: 'status',
            scheme : 'public'
          },
          key: 'id'
        }
      },
      manufacturer_id: {
        type: Sequelize.INTEGER,
        references: {
          model : {
            tableName: 'manufacturers',
            scheme : 'public'
          },
          key: 'id'
        }
      },
      progep_sector_id: {
        type: Sequelize.INTEGER,
        references: {
          model : {
            tableName: 'progep_sectors',
            scheme : 'public'
          },
          key: 'id'
        }
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model : {
            tableName: 'categories',
            scheme : 'public'
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
