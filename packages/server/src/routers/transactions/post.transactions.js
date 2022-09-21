const express = require('express');
const router = express.Router();
const {transactions, carts, products, transaction_details} = require("../../../models")
const moment = require('moment')
const { auth } = require('../../helpers/auth');
const { Op } = require('sequelize');
const schedule = require('node-schedule');


const postTransaction = async (req, res, next) =>{
  try {
    const {user_id} = req.user

    const resFindCarts = await carts.findAll({
      where: {
        user_id,
      },
      
      // include: [products],
    });

    // console.log(resFindCarts)

      const resCreateTransaction = await transactions.create({
        user_id,
        // mapCarts
        // totalPrice: countTotalPrice()
        // address_id,
        // paymentProof,
      });
      console.log(resCreateTransaction)
      
      const dueDate = moment(resCreateTransaction.dataValues.createdAt).add(20, 'seconds')

      const productExist = await Promise.all(
        resFindCarts.map(async (data) =>{
          try {
            const existingProduct = await products.findOne({
              where: { product_id: data.dataValues.product_id}
            })
            return existingProduct.dataValues
          } catch (error) {
            console.log(error)
          }
        })
      )

      schedule.scheduleJob(new Date(dueDate), async () =>{
        console.log("disini")
        const checkingStatus = await transactions.findOne({
          where: {
            transaction_id: resCreateTransaction.dataValues.transaction_id,
            status: 'awaiting_payment',
          },
          attributes: ['transaction_id', 'prescription_id', 'user_id', 'address_id'],
        });

        resFindCarts.forEach(async (data) => {
          console.log(data)
        if(checkingStatus.dataValues.transaction_id){
          await transactions.update(
            {status: 'order_cancelled'},
            {where: {transaction_id: resCreateTransaction.dataValues.transaction_id}}
          )
        const updateProduct = await products.findOne({
          where: {product_id: data.dataValues.product_id}
        })
        console.log(updateProduct)
        await products.update(
          {productStock: updateProduct.dataValues.productStock + data.dataValues.quantity},
          {where: {product_id: data.dataValues.product_id}}
        )
        console.log("sukses ngab")
      }
      })
    })


    resFindCarts.forEach(async (data) => {
      const updateProduct = await products.findOne({
          where: {product_id: data.dataValues.product_id}})
          await products.update(
      {productStock: updateProduct.dataValues.productStock - data.dataValues.quantity},
        {where: {product_id: data.dataValues.product_id}
    })
    console.log("jalan")
  })

    res.send({
      status: 'success',
      message: 'create transcation success!',
      data: {
        productExist,
      },
    });
    resFindCarts.forEach(async (data) => {
      await transaction_details.create({
        quantity: data.dataValues.quantity,
        product_id: data.dataValues.product_id,
        transaction_id: resCreateTransaction.dataValues.transaction_id,
      });
    });
  } catch (error) {
    next(error)
  }
}


router.post('/createTransaction', auth, postTransaction);

module.exports = router