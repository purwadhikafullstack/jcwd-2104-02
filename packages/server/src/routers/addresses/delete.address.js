const express = require('express');
const router = express.Router();
const { addresses } = require('../../../models');
const { auth } = require('../../helpers/auth');

const deleteAddress = async (req, res, next) => {
  try {
    const { address_id } = req.params;

    const resDeleteAddress = await addresses.destroy({ where: { address_id } });

    res.send({
      status: 'Success',
      message: 'Success delete address',
      detail: {
        address_id,
        resDeleteAddress,
      },
    });
  } catch (error) {
    next(error);
  }
};

router.delete('/:address_id', auth, deleteAddress);

module.exports = router;
