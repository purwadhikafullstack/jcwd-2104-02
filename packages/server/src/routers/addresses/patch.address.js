const express = require('express');
const router = express.Router();
const { isFieldEmpties } = require('../../helpers');
const { addresses } = require('../../../models');
const { auth } = require('../../helpers/auth');

const updateAddress = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const { address_id } = req.params;

    const {
      recipient,
      province_id,
      province,
      city_id,
      city_name,
      addressDetail,
      postalCode,
    } = req.body;

    const emptyFields = isFieldEmpties({
      recipient,
      province_id,
      province,
      city_id,
      city_name,
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

    const resUpdateUser = await addresses.update(
      {
        recipient,
        province_id,
        province,
        city_id,
        city_name,
        addressDetail,
        postalCode,
      },
      {
        where: { user_id, address_id },
      },
    );

    if (resUpdateUser.affectedRows)
      throw { message: 'Failed to update address' };

    res.send({
      status: 'Success',
      message: 'Success update address',
    });
  } catch (error) {
    next(error);
  }
};

router.patch('/update/:address_id', auth, updateAddress);

module.exports = router;
