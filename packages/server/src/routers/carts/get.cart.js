const express = require('express');
const { carts } = require('../../../models');
const { auth } = require('../../helpers/auth');
const router = express.Router();

const getCartsController = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const resGetCarts = await carts.findAll({
      raw: true,
      order: [['createdAt', 'DESC']],
    });
    const mappedUser = resGetCarts.map((cart) => {
      return cart.user_id;
    });

    const userFound = [];

    for (const user_id of mappedUser) {
      const getCart = await carts.findOne({ where: { user_id } });
      userFound.push(getCart);
    }

    const resCartUser = resGetCarts.map((cart, index) => {
      cart = userFound[index];
      return cart;
    });

    res.send({
      status: 'Success',
      message: 'Success get all carts',
      data: resGetCarts,
    });
  } catch (error) {
    next(error);
  }
};

router.get('/getCarts/:user_id', auth, getCartsController);

module.exports = router;
