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

async function updateProductController(req, res, next) {
  try {
    const { productInputs, currentProduct } = req.body;

    const { product_id } = req.params;

    const categorySplit = productInputs.categoryInfo.split('=-=');
    const resFindProduct = await products.findOne({ where: { product_id } });

    const extName = productInputs.productImage.split('.');

    const resUpdateProduct = await resFindProduct.update({
      productName: productInputs.productName,
      productPrice: productInputs.productPrice,
      productImage: `http://localhost:8000/public/productImages/${product_id}.${extName[1]}`,
      description: productInputs.description,
      productStock: productInputs.productStock,
      packageType: productInputs.packageType,
      servingType: productInputs.servingType,
    });

    const resCreateCategory = await categories.create({
      category_lists_id: categorySplit[0],
      product_id: resUpdateProduct.dataValues.product_id,
      categoryName: categorySplit[1],
    });

    const resDeleteProductDetails = await product_details.destroy({
      where: { product_id },
    });

    for (let i = 0; i < productInputs.productStock; i++) {
      await product_details.create({
        product_id: resUpdateProduct.dataValues.product_id,
        quantity: productInputs.defaultQuantity,
        current_quantity: productInputs.defaultQuantity,
        isOpen: false,
        isAvailable: true,
      });
    }

    // if (currentProduct.productStock < productInputs.productStock) {
    //   const resFindProduct = await products.findOne({ where: { product_id } });

    //   const addition = productInputs.productStock - currentProduct.productStock;

    //   const findProductDetails = await product_details.findAll({
    //     where: { product_id },
    //   });

    //   console.log({
    //     method: 'increment',
    //     findProductDetails: findProductDetails[0].dataValues,
    //     resUpdateProduct,
    //   });

    //   res.send({
    //     status: 'success',
    //     method: 'increment',
    //     addition,
    //   });
    // } else if (currentProduct.productStock > productInputs.productStock) {
    //   const resFindProduct = await products.findOne({ where: { product_id } });

    //   const resUpdateProduct = await resFindProduct.update({
    //     productName: productInputs.productName,
    //     productPrice: productInputs.productPrice,
    //     productImage: productInputs.productImage,
    //     description: productInputs.description,
    //     productStock: productInputs.productStock,
    //     packageType: productInputs.packageType,
    //     servingType: productInputs.servingType,
    //   });

    //   const reduceValue =
    //     currentProduct.productStock - productInputs.productStock;

    //   const findProductDetails = await product_details.findAll({
    //     where: { product_id },
    //   });

    //   console.log({
    //     method: 'reduce',
    //     findProductDetails: findProductDetails[0].dataValues,
    //     resUpdateProduct,
    //   });

    //   res.send({
    //     status: 'success',
    //     method: 'reduce',
    //     reduceValue,
    //   });
    // } else {
    //   res.send({
    //     status: 'success',
    //   });
    // }

    res.send({
      status: 'success',
      resUpdateProduct,
    });
  } catch (error) {
    next(error);
  }
}

router.patch('/productsUpdate/:product_id', updateProductController);

module.exports = router;
