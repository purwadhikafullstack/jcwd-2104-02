'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('transaction_details', [
      {
        transaction_details_id: 1,
        transaction_id: 1,
        user_id: 2,
        cart_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('transaction_details', null, {});
  },
};
