const express = require('express');
const router = express.Router();
const {
  transactions,
  carts,
  products,
  transaction_details,
  addresses
} = require('../../../models');
const { auth } = require('../../helpers/auth');


const getTransactions = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    console.log(user_id);
    const resFetchTransactions = await transactions.findAll({
      where: { user_id },
      attributes: [
        'transaction_id',
        'prescription_id',
        'user_id',
        'address_id',
        'totalPrice',
        'status',
        'courier',
        'deliveryCost',
      ],

      include: [
        {
          model: transaction_details,
          include: [
            {
              model: products,
            },
          ],
        },
      ],
    });
    // console.log("bangggg")
      const resFetchAddress = await addresses.findAll({
        where: { address_id: resFetchTransactions[0].address_id },
        attributes: [
          `address_id`,
          `user_id`,
          `addressDetail`,
          `recipient`,
          `postalCode`,
          `province_id`,
          `province`,
          `city_id`,
          `city_name`,
          `isDefault`,
        ],
      });

      res.send({
        status: 'success',
        message: 'Fetch Transaction Success',
        data: {
          resFetchTransactions,
          resFetchAddress
        },
      });
  } catch (error) {
    next(error);
  }
};

const getTransactionsById = async (req, res, next) => {
  try {
    const { transaction_id } = req.params;
    // console.log(user_id);
    const resFetchTransactions = await transactions.findOne({
      where: { transaction_id },
      attributes: [
        'transaction_id',
        'prescription_id',
        'user_id',
        'address_id',
        'totalPrice',
        'status',
        'courier',
        'deliveryCost'
      ],
    });
    console.log("bangggg")
    const resFetchAddress = await addresses.findAll({
      where: { address_id: resFetchTransactions.address_id },
      attributes: [
        `address_id`,
        `user_id`,
        `addressDetail`,
        `recipient`,
        `postalCode`,
        `province_id`,
        `province`,
        `city_id`,
        `city_name`,
        `isDefault`,
      ],
    });
    console.log(resFetchAddress)

    res.send({
      status: 'success',
      message: 'Fetch Transaction Success',
      data: {
        resFetchTransactions,
        resFetchAddress,
      },
    });
  } catch (error) {
    next(error);
  }
};


const getTransactionDetails = async (req, res, next) => {
  try {

    const {transaction_id} = req.params
    const resFetchTransactionDetails = await transaction_details.findAll({
      where: { transaction_id },
      include: [products]
    });

    console.log({resFetchTransactionDetails});
    res.send({
      status: 'success',
      message: 'Fetch details Success',
      data: {
        // resFetchTransactions,
        resFetchTransactionDetails
      },
    });
  } catch (error) {
    next(error);
  }
};

const getTransactionsByIndex = async (req, res, next) => {
  try {
    const { selected } = req.params;    
    const { user_id } = req.params;
    


    var statusFind

    switch (selected) {
      case '1' || 1:
        statusFind = 'processing_order';
        break;
      case '2' || 2:
        statusFind = 'delivering_order';
        break;
      case '3' || 3:
        statusFind = 'order_confirmed';
        break;
      case '4' || 4:
        statusFind = 'order_cancelled';
        break;
      case '5' || 5:
        statusFind = 'awaiting_payment';
        break;
      case '6' || 6:
        statusFind = 'awaiting_payment_confirmation';
        break;

      default:
        const { user_id } = req.params;
        console.log(user_id);
        const resFetchTransactions = await transactions.findAll({
          where: { user_id },
          attributes: [
            'transaction_id',
            'prescription_id',
            'user_id',
            'address_id',
            'totalPrice',
            'status',
          ],

          include: [
            {
              model: transaction_details,
              include: [
                {
                  model: products,
                },
              ],
            },
          ],
        });

        res.send({
          status: 'success',
          message: 'Fetch Transaction Success',
          data: {
            resFetchTransactions,
          },
        });
    }

    console.log({ statusFind, selected });
    const resFetchTransactions = await transactions.findAll({
      where: { user_id, status: statusFind },
      attributes: [
        'transaction_id',
        'prescription_id',
        'user_id',
        'address_id',
        'totalPrice',
        'status',
      ],

      include: [
        {
          model: transaction_details,
          include: [
            {
              model: products,
            },
          ],
        },
      ],
    });

    res.send({
      status: 'success',
      message: 'Fetch Transaction Success',
      data: {
        resFetchTransactions,
      },
    });
  } catch (error) {
    next(error);
  }
};

router.get('/:user_id', auth, getTransactions);
router.get('/transById/:transaction_id', auth, getTransactionsById);
router.get('/getDetails/:transaction_id', auth, getTransactionDetails);
router.get('/getTransactionsByIndex/:user_id/:selected', auth, getTransactionsByIndex);

module.exports = router;