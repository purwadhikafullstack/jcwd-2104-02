const express = require('express');
const router = express.Router();
const { addresses } = require('../../../models');
const { auth } = require('../../helpers/auth');

const getUserAddresses = async (req, res, next) => {
  try {
    const { user_id } = req.user;

    const resGetUserAddresses = await addresses.findAll({
      where: { user_id },
    });
    if (!resGetUserAddresses) throw { message: 'Address not found' };

    res.send({
      status: 'Success',
      message: 'Success get address lists',
      data: resGetUserAddresses,
    });
  } catch (error) {
    next(error);
  }
};

router.get('/useraddresslists/', auth, getUserAddresses);

module.exports = router;
