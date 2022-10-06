const express = require('express');
const router = express.Router();
const { uploadProductImage } = require('../../lib/multer');
const { auth } = require('../../helpers/auth');
const { QueryTypes } = require('sequelize');
const {
  products,
  sequelize,
  categories,
  categories_list,
  product_details,
} = require('../../../models');

async function postNewProductController(req, res, next) {
  try {
    // console.log({ body: req.body });
    const {
      categoryInfo,
      description,
      packageType,
      productImage,
      productName,
      productPrice,
      productStock,
      defaultQuantity,
      servingType,
    } = req.body;

    const imageExtNameSplit = productImage.split('.');
    const categorySplit = categoryInfo.split('=-=');

    const resCreateProduct = await products.create({
      productName,
      productPrice: parseInt(productPrice),
      description,
      productStock: parseInt(productStock),
      defaultQuantity,
      servingType,
      isPublic: false,
      packageType,
    });

    await resCreateProduct.update({
      productImage: `/public/productImages/${
        resCreateProduct.dataValues.product_id
      }.${imageExtNameSplit[imageExtNameSplit.length - 1]}`,
    });

    const resCreateCategory = await categories.create({
      category_lists_id: categorySplit[0],
      product_id: resCreateProduct.dataValues.product_id,
      categoryName: categorySplit[1],
    });

    setTimeout(() => {
      res.send({
        status: 'success',
        resCreateProduct,
        resCreateCategory,
      });
    }, 2000);
  } catch (error) {
    next(error);
  }
}

async function postNewProductImageController(req, res, next) {
  try {
    res.send({
      status: 'success',
      imageName: req.params.product_filename,
    });
  } catch (error) {
    next(error);
  }
}


const postNewConvertedProduct = async (req, res, next) => {
  try {
    const { productName, formula } = req.body;
    const checkProduct = await products.findOne({
      where: { productName },
    });
    if (checkProduct.length)
      throw {
        code: 400,
        message: 'Product Name exists',
      };

    let price = 0;
    const getInitialStock = await Promise.all(
      formula.map(async (data) => {
        const existingProducts = await products.findOne({
          where: {
            productName: data.productName,
          },
          include: { model: product_details },
        });
      }),
    );

    const newProduct = await products.create({
      productName: productName,
      formula: formula,
      productStock: 1,
      defaultQuantity: 0,
      isPublic: 0,
      packageType: 'concoction',
      servingType: 'concoction',
      description: 'this is a concoction',
      productImage,
      productPrice,
    });
  } catch (error) {
    next(error);
  }
};

router.post('/specifics/:specifics', getSpecificProductsController);
router.post('/sort/:sortOrder', getAllProductsSortedController);
router.post('/newProduct', postNewProductController);
router.post(
  '/newProductImage/:product_filename',
  uploadProductImage.single('productImageFile'),
  postNewProductImageController,
);

module.exports = router;