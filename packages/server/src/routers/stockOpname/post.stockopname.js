const express = require('express');
const router = express.Router();
const {
  transactions,
  products,
  transaction_details,
  addresses,
  stock_opnames
} = require('../../../models');
const { auth } = require('../../helpers/auth');


const postTransactionOpname = async (req,res,next)=>{
try {
  const { activity } = req.body;
  const resFindTransaction = await transaction_details.findAll({
    include: [
      {
        model: transactions,
        attributes: ['status'],
        where: { status: 'order_confirmed' },
      },
    ],
  });
  // console.log(resFindTransaction);

  function mappedTransactionDetail() {
    return resFindTransaction.map((data)=>{
    console.log(data.dataValues)
  })
}
  // console.log(mappedTransactionDetail())

  resFindTransaction.forEach(async (data) => {
    // console.log(data)
    await stock_opnames.create({
      //  stock_opname_id: resFindTransaction.dataValues.transaction_details_id,
      product_id: data.product_id,
      stock: data.quantity,
      transaction_id: data.transaction_id,
      activity: activity,
    });
  });
  console.log(a)
   res.send({
     status: 'Success',
     message: 'success create stock opname',
   })

} catch (error) {
    next(error)
}
  }

router.post('/create', postTransactionOpname)

module.exports = router