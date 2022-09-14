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

const getOneUserAddress = async (req, res, next) => {
  try {
    const { address_id } = req.params;

    const resGetUserAddresses = await addresses.findOne({
      where: { address_id },
    });
    if (!resGetUserAddresses) throw { message: 'Address not found' };

    res.send({
      status: 'Success',
      message: 'Success get one user address',
      data: resGetUserAddresses,
    });
  } catch (error) {
    next(error);
  }
};

router.get('/useraddresslists/', auth, getUserAddresses);
router.get('/useraddress/:address_id', auth, getOneUserAddress);

module.exports = router;
