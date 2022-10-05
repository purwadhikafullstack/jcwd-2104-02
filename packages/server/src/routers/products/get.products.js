const express = require('express');
const router = express.Router();
const { products } = require('../../../models');
const { auth } = require('../../helpers/auth');

async function getAllProducts(req, res, next) {
  try {
    const resGetAllProducts = await products.findAll({
      order: [['productName', 'ASC']],
    });
    res.send({
      status: 'success',
      message: 'get products success',
      data: {
        resGetAllProducts,
      },
    });
  } catch (error) {
    next(error);
  }
}

router.get('/', getAllProducts);

module.exports = router;
