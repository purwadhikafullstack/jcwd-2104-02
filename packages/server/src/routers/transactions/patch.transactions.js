const express = require('express');
const router = express.Router();
const {
  transactions,
  carts,
  products,
  transaction_details,
} = require('../../../models');
const moment = require('moment');
const { auth } = require('../../helpers/auth');
const { Op } = require('sequelize');
const schedule = require('node-schedule');
const { uploadPayment } = require('../../lib/multer');

const patchTransaction = async (req, res, next) => {
  try {
    const { transStatus, trans } = req.body;
    // console.log({transStatus,trans})
    const { transaction_id } = trans;

    const resFindTransaction = await transactions.findOne({
      where: { transaction_id, status: 'awaiting_payment' },
      attributes: ['transaction_id', 'user_id', 'address_id'],
    });
    console.log(resFindTransaction);

    if (resFindTransaction.dataValues) {
      const resPaymentSuccess = await transactions.update(
        {
          status: transStatus,
        },
        { where: { transaction_id } },
      );

      res.send({
        status: 'success',
        message: 'Payment Success',
        data: {
          resPaymentSuccess,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const updatePaymentProof = async (req, res, next) => {
  try {
    const { transaction_id } = req.params;
    const { filename } = req.file;
    const finalFileName = `/public/paymentProof/${filename}`;

    // console.log({ transaction_id });

    const resUpdateAvatar = await transaction_details.update(
      {
        paymentProof: finalFileName,
      },
      {
        where: {
          transaction_id,
          // user_id
        },
      },
    );

    if (resUpdateAvatar.affectedRows)
      throw { message: 'Failed to upload Payment Proof' };

    res.send({
      status: 'Success',
      message: 'Success upload payment proof',
    });
  } catch (error) {
    next(error);
  }
};

const cancelTransaction = async (req, res, next) => {
  try {
    const { transaction_id } = req.params;

    const resFindTransaction = await transactions.findOne({
      where: { transaction_id },
      attributes: ['transaction_id', 'user_id', 'address_id'],
    });

    if (resFindTransaction.dataValues) {
      const resCancelOrder = await transactions.update(
        {
          status: 'order_cancelled',
        },
        { where: { transaction_id } },
      );
      res.send({
        status: 'Success',
        message: 'order is cancelled',
        data: {
          resCancelOrder,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const confirmTransaction = async (req, res, next) => {
  try {
    const { transaction_id } = req.params;

    const resFindTransaction = await transactions.findOne({
      where: { transaction_id },
      attributes: ['transaction_id', 'user_id', 'address_id'],
    });

    if (resFindTransaction.dataValues) {
      const resConfirmOrder = await transactions.update(
        {
          status: 'order_confirmed',
        },
        { where: { transaction_id } },
      );
      res.send({
        status: 'Success',
        message: 'order is confirmed',
        data: {
          resConfirmOrder,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const adminConfirmDeliver = async (req, res, next) => {
  try {
    const { transaction_id } = req.params;

    const resconfirmDeliver = await transactions.update(
      {
        status: 'delivering_order',
      },
      { where: { transaction_id } },
    );
    res.send({
      status: 'Success',
      message: 'Confirmation Success. Order is being delivered.',
      data: {
        resconfirmDeliver,
      },
    });
  } catch (error) {
    next(error);
  }
};

const adminCancelOrder = async (req, res, next) => {
  try {
    const { transaction_id } = req.params;

    const resCancelOrder = await transactions.update(
      {
        status: 'order_cancelled',
      },
      { where: { transaction_id } },
    );
    res.send({
      status: 'Success',
      message: 'Cancel Order Success.',
      data: {
        resCancelOrder,
      },
    });
  } catch (error) {
    next(error);
  }
};

router.patch('/patchTransaction', auth, patchTransaction);
router.patch(
  '/paymentProof/:transaction_id',
  auth,
  uploadPayment.single('paymentProof'),
  updatePaymentProof,
);
router.patch('/cancelTransaction/:transaction_id', cancelTransaction);
router.patch('/confirmTransaction/:transaction_id', confirmTransaction);
router.patch('/adminConfirmDeliver/:transaction_id', adminConfirmDeliver);
router.patch('/adminCancelOrder/:transaction_id', adminCancelOrder);

module.exports = router;
