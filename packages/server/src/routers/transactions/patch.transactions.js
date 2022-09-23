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



const patchTransaction = async (req, res, next)=>{
    try {
            const { transaction_id, status } = req.body;

            const resFindTransaction = await transactions.findOne({
              where: { transaction_id, status: "awaiting_payment" },
              attributes: ['transaction_id','prescription_id', 'user_id', 'address_id'],
            });
            console.log(resFindTransaction);


            if (resFindTransaction.dataValues) {
            const resPaymentSuccess = await transactions.update(
            {
              status,
            },
            {where: {transaction_id}},
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
        next(error)
    }
}



router.patch('/patchTransaction', auth, patchTransaction)

module.exports = router