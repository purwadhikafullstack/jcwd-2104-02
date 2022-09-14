'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('categories', [
      {
        category_id: 1,
        category_lists_id: 1,
        product_id: 1,
        categoryName: 'Flu & Batuk',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_id: 2,
        category_lists_id: 2,
        product_id: 2,
        categoryName: 'Asma',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_id: 3,
        category_lists_id: 3,
        product_id: 3,
        categoryName: 'Antibiotik',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_id: 4,
        category_lists_id: 1,
        product_id: 4,
        categoryName: 'Flu & Batuk',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_id: 5,
        category_lists_id: 1,
        product_id: 5,
        categoryName: 'Flu & Batuk',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories', null, {});
  },
};
