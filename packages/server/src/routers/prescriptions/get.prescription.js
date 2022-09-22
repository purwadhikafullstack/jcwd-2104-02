const express = require('express');
const router = express.Router();
const { prescriptions } = require('../../../models');
const { auth } = require('../../helpers/auth');

const getUserPrescription = async (req, res, next) => {
  try {
    const { user_id } = req.user;

    const resGetUserPrescription = await prescriptions.findAll({
      where: { user_id },
    });
    if (!resGetUserPrescription)
      throw { message: 'User prescription not found' };

    res.send({
      status: 'Success',
      message: 'Get User Prescription Success',
      data: resGetUserPrescription,
    });
  } catch (error) {
    next(error);
  }
};

router.get('/userPrescription/', auth, getUserPrescription);

module.exports = router;
