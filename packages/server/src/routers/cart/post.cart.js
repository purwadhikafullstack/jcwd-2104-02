const express = require('express');
const { carts } = require('../../../models');
const { auth } = require('../../helpers/auth');
const router = express.Router();

const addToCartController = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const { user_id } = req.user;
    const { product_id } = req.params;

    const resCreateCart = await carts.create({
      quantity: quantity,
      product_id: product_id,
      user_id: user_id,
    });

    res.send({
      status: 'success',
      message: 'created cart success',
      data: {
        result: {
          user_id: user_id,
          quantity: quantity,
          product_id: product_id,
        },
      },
      detail: resCreateCart,
    });
  } catch (error) {
    next(error);
  }
};

router.post('/addToCart/:product_id', auth, addToCartController);

module.exports = router;
