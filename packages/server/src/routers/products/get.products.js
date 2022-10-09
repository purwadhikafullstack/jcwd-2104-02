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
  Sequelize,
} = require('../../../models');

const getProductDetail = async (req, res, next) => {
  try {
    const { product_id } = req.params;

    const resProductDetail = await products.findOne({
      where: {
        product_id,
      },
    });

    res.send({
      status: 'Success',
      message: 'Success get product detail',
      data: resProductDetail,
    });
  } catch (error) {
    next(error);
  }
};

const landingPageProducts = async (req, res, next) => {
  try {
    const { limit, productsPage } = req.query;

    const landingPageProducts = await products.findAll({
      offset: parseInt(productsPage - 1) * parseInt(limit),
      limit: parseInt(limit),
    });

    const hasMore = (
      await products.findAll({
        offset: parseInt(productsPage) * parseInt(limit),
        limit: parseInt(limit),
      })
    ).length;

    res.send({
      status: 'success',
      landingPageProducts,
      hasMore,
    });
  } catch (error) {
    next(error);
  }
};

router.get('/byId/:product_id', auth, getProductDetail);
router.get('/landingPage', landingPageProducts);

module.exports = router;
