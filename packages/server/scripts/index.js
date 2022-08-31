const { products } = require('../models');
const { users } = require('../models');

async function addProduct() {
  try {
    await products.create({
      productName: 'obat',
      productPrice: 20000,
      productImage: 'obat',
      productStock: 23,
      isPublic: false,
    });
  } catch (error) {
    console.log({ error });
  }
}

async function addUser() {
  try {
    await users.create({
      name: 'user1',
      email: 'user1@mail.com',
      gender: 'Male',
      birthDate: '12/17/2004 07:00:00',
      phoneNumber: '3213212878',
      isAdmin: false,
      avatar: 'sdawwdij',
      password: 'sdawsdjbniu',
    });
  } catch (error) {
    console.log({ error });
  }
}
addUser();
// addProduct();
