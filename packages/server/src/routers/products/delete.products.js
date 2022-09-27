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

async function deleteProductController(req, res, next) {
  try {
    const { product_id } = req.params;

    console.log({ product_id });

    const resDeleteProduct = await products.destroy({
      where: { product_id },
    });

    const resDeleteProductDetail = await product_details.destroy({
      where: { product_id },
    });

    console.log({ resDeleteProduct, resDeleteProductDetail });

    res.send({
      status: 'success',
      message: 'success delete product',
    });
  } catch (error) {
    next(error);
  }
}

router.delete('/:product_id', deleteProductController);

module.exports = router;
