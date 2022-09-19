'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'carts', // table name
      'quantity', // new field name
      {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('carts', 'quantity');
  },
};
