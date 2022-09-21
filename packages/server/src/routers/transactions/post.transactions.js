const express = require('express');
const router = express.Router();
const {transactions, carts, products} = require("../../../models")
const moment = require('moment')
const { auth } = require('../../helpers/auth');
const { Op } = require('sequelize');
const schedule = require('node-schedule');


const postTransaction = async (req, res, next) =>{
  try {
    const {user_id} = req.params

    const resFindCarts = await carts.findAll({
      where: {
        user_id,
      },
      // include: [products],
    });
    // console.log(resFindCarts)
    const mapCarts = resFindCarts.map((cart, index)=>{
      return cart.dataValues
    })
    console.log(mapCarts)

    if (resFindCarts.length) {
      const resCreateTransaction = await transactions.create({
        // user_id,
        // mapCarts
        // totalPrice: countTotalPrice()
        // address_id,
        // paymentProof,
      });
      // console.log(resCreateTransaction)
      
      // const dueDate = moment(resCreateTransaction.dataValues.createdAt).add(30, 'seconds')

      // const existingProduct = await products.findOne({
      //   where: {product_id: product_id}
      // })

      // schedule.scheduleJob(new Date(dueDate), async () =>{
      //   const checkingStatus = await transactions.findOne({
      //     where: {transaction_id: resCreateTransaction.dataValues.transaction_id, status: 'awaiting_payment'}
      //   })
      //   if(checkingStatus.dataValues.transaction_id){
      //     await transactions.update(
      //       {status: 'order_cancelled'},
      //       {where: {transaction_id: resCreateTransaction.dataValues.transaction_id}}
      //     )
      //   const updateProduct = await products.findOne({
      //     where: {product_id: product_id}
      //   })
      //   await products.update(
      //     {productStock: parseInt(updateProduct.dataValues.productStock) + parseInt(quantity)},
      //     {where: {product_id: product_id}}
      //   )
      //   console.log("sukses ngab")
      // }
      // })
      // await products.update(
      //   {productStock: existingProduct.dataValues.productStock - quantity},
      //     {where: {product_id: product_id}
      // })
      res.send({
        status: 'success',
        message: 'create transcation success!',
        data: {
          resCreateTransaction,
        },
      });
    }

  } catch (error) {
    next(error)
  }
}


router.post('/createTransaction/:user_id', auth, postTransaction);

module.exports = router