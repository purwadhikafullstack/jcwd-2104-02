'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        name: 'user1',
        email: 'user1@mail.com',
        gender: 'Male',
        birthDate: new Date('10-17-2021 07:00:00'),
        phoneNumber: '3213212878',
        isAdmin: false,
        avatar: 'sdawwdij',
        password: 'sdawsdjbniu',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'user2',
        email: 'user2@mail.com',
        gender: 'Female',
        birthDate: new Date('10-11-2021 07:00:00'),
        phoneNumber: '3213212854',
        isAdmin: true,
        avatar: 'sdawwdifd',
        password: 'sdawsdjbniu',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'user3',
        email: 'user3@mail.com',
        gender: 'Male',
        birthDate: new Date('10-27-2021 07:00:00'),
        phoneNumber: '9213212878',
        isAdmin: false,
        avatar: 'sdwwdij',
        password: 'sdswdawsdjbniu',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
