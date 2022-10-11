'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('categories_lists', [
      {
        category_lists_id: 1,
        category: 'Flu & Batuk',
        categoryImage: '/public/categoriesImage/Batuk.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_lists_id: 2,
        category: 'Asma',
        categoryImage: '/public/categoriesImage/Asthma.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_lists_id: 3,
        category: 'Antibiotik',
        categoryImage: '/public/categoriesImage/Antibiotik.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_lists_id: 4,
        category: 'Mata',
        categoryImage: '/public/categoriesImage/Mata.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_lists_id: 5,
        category: 'P3K',
        categoryImage: '/public/categoriesImage/P3K.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_lists_id: 6,
        category: 'Vitamin',
        categoryImage: '/public/categoriesImage/Vitamin.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_lists_id: 7,
        category: 'Pusing',
        categoryImage: '/public/categoriesImage/Logo-pusing.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_lists_id: 8,
        category: 'Pencernaan',
        categoryImage: '/public/categoriesImage/Pencernaan.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_lists_id: 9,
        category: 'Minyak angin & Balsem',
        categoryImage: '/public/categoriesImage/Minyak-angin-balsem.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories_lists', null, {});
  },
};
