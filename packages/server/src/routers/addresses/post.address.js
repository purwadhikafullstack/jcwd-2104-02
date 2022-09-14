const express = require('express');
const router = express.Router();
const { isFieldEmpties } = require('../../helpers');
const { addresses } = require('../../../models');
const { auth } = require('../../helpers/auth');

const addAddress = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const {
      recipient,
      province_id,
      province,
      city_id,
      city,
      addressDetail,
      postalCode,
    } = req.body;

    const emptyFields = isFieldEmpties({
      recipient,
      province_id,
      province,
      city_id,
      city,
      addressDetail,
      postalCode,
    });

    if (emptyFields.length) {
      throw {
        code: 400,
        message: `${emptyFields} cannot be empty`,
        data: { result: emptyFields },
      };
    }

    const resUpdateUser = await addresses.create(
      {
        user_id,
        recipient,
        province_id,
        province,
        city_id,
        city,
        addressDetail,
        postalCode,
      },
      {
        where: { user_id },
      },
    );

    if (resUpdateUser.affectedRows)
      throw { message: 'Failed to create address' };

    res.send({
      status: 'Success',
      message: 'Success create address',
    });
  } catch (error) {
    next(error);
  }
};

router.post('/add', auth, addAddress);

module.exports = router;
