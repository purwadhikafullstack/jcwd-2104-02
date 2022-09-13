'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      product_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productName: {
        type: Sequelize.STRING(255),
      },
      productPrice: {
        type: Sequelize.INTEGER,
      },
      productImage: {
        type: Sequelize.STRING(255),
      },
      description: {
        type: Sequelize.STRING,
      },
      productStock: {
        type: Sequelize.INTEGER,
      },
      isPublic: {
        type: Sequelize.BOOLEAN,
      },
      packageType: {
        type: Sequelize.STRING,
      },
      servingType: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  },
};
