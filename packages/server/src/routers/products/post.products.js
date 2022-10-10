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
    console.log(req.body);
    const { productName, formula } = req.body;
    console.log(productName);
    const checkProduct = await products.findOne({
      where: { productName },
    });
    console.log(checkProduct);

    if (checkProduct)
      throw {
        code: 400,
        message: 'Product Name exists',
      };

    let price = 0;
    const getInitialStock = await Promise.all(
      formula.map(async (data) => {
        const resProduct = await products.findOne({
          where: { productName: data.productName },
        });
        price +=
          (resProduct.productPrice / resProduct.defaultQuantity) *
          data.quantity;

        const resDetail = await product_details.findOne({
          where: { product_id: resProduct.product_id },
        });
        if (!resDetail) {
          const newDetail = await product_details.create({
            product_id: resProduct.product_id,
            quantity: resProduct.defaultQuantity,
            current_quantity: resProduct.defaultQuantity,
          });
          if (
            data.quantity > newDetail.current_quantity ||
            data.quantity == newDetail.current_quantity
          ) {
            const sisa = data.quantity % newDetail.current_quantity;
            const buka = Math.floor(data.quantity / newDetail.current_quantity);
            const newQuantity = newDetail.current_quantity - sisa;
            if (sisa == 0) {
              const defaultUpdate = await product_details.update(
                {
                  current_quantity: resProduct.defaultQuantity,
                },
                { where: { product_id: resProduct.product_id } },
              );
            } else {
              const updateQuantity = await product_details.update(
                {
                  current_quantity: newQuantity,
                },
                { where: { product_id: resProduct.product_id } },
              );
            }

            const newStock = resProduct.productStock - buka;
            const updateStock = await products.update(
              {
                productStock: newStock,
              },
              { where: { product_id: resProduct.product_id } },
            );
          } else if (data.quantity < newDetail.current_quantity) {
            const newQuantity = newDetail.current_quantity - data.quantity;
            const updateQuantity = await product_details.update(
              {
                current_quantity: newQuantity,
              },
              { where: { product_id: resProduct.product_id } },
            );
          }
        } else {
          if (
            data.quantity > resDetail.current_quantity ||
            data.quantity == resDetail.current_quantity
          ) {
            const sisa = data.quantity % resDetail.current_quantity;
            const buka = Math.floor(data.quantity / resDetail.current_quantity);
            const newQuantity = resDetail.current_quantity - sisa;
            if (sisa == 0) {
              const updateQuantity = await product_details.update(
                {
                  current_quantity: resDetail.quantity,
                },
                { where: { product_id: resProduct.product_id } },
              );
            } else {
              const updateQuantity = await product_details.update(
                {
                  current_quantity: newQuantity,
                },
                { where: { product_id: resProduct.product_id } },
              );
            }

            const newStock = resProduct.productStock - buka;
            const updateStock = await products.update(
              {
                productStock: newStock,
              },
              { where: { product_id: resProduct.product_id } },
            );
          } else if (data.quantity < resDetail.current_quantity) {
            const newQuantity = resDetail.current_quantity - data.quantity;
            const updateQuantity = await product_details.update(
              {
                current_quantity: newQuantity,
              },
              { where: { product_id: resProduct.product_id } },
            );
          }
        }
      }),
    );
    // console.log(price);

    const newConcoction = await products.create({
      productName: productName,
      formula: formula,
      productStock: 1,
      defaultQuantity: 1,
      isPublic: 0,
      packageType: 'concoction',
      servingType: 'concoction',
      description: 'this is a concoction',
      productImage:
        'http://localhost:8000/public/productImages/default-concoction.png',
      productPrice: price,
    });
    res.send({
      status: 'success',
      message: 'new concoction created',
      data: {
        newConcoction,
      },
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
router.post('/concoction', postNewConvertedProduct);

module.exports = router;