'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('categories_lists', [
      {
        category_lists_id: 1,
        category: 'Flu & Batuk',
        categoryImage: 'http://localhost:8000/public/categoriesImage/Batuk.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_lists_id: 2,
        category: 'Asma',
        categoryImage:
          'http://localhost:8000/public/categoriesImage/Asthma.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_lists_id: 3,
        category: 'Antibiotik',
        categoryImage:
          'http://localhost:8000/public/categoriesImage/Antibiotik.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_lists_id: 4,
        category: 'Mata',
        categoryImage: 'http://localhost:8000/public/categoriesImage/Mata.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_lists_id: 5,
        category: 'P3K',
        categoryImage: 'http://localhost:8000/public/categoriesImage/P3K.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_lists_id: 6,
        category: 'Vitamin',
        categoryImage:
          'http://localhost:8000/public/categoriesImage/Vitamin.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_lists_id: 7,
        category: 'Pusing',
        categoryImage:
          'http://localhost:8000/public/categoriesImage/Logo-pusing.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_lists_id: 8,
        category: 'Pencernaan',
        categoryImage:
          'http://localhost:8000/public/categoriesImage/Pencernaan.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_lists_id: 9,
        category: 'Minyak angin & Balsem',
        categoryImage:
          'http://localhost:8000/public/categoriesImage/Minyak-angin-balsem.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories_lists', null, {});
  },
};
