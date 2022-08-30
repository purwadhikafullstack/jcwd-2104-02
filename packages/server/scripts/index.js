const { products } = require('../models');

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

addProduct();
