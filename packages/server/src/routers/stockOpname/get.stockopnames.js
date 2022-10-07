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

const getStockOpname = async (req,res,next)=>{
    try {
    const {product_id} = req.params
    
    const resGetStockOpname = await stock_opnames.findAll({
      where: { product_id },
      include: [
        {
          model: transactions,
            attributes: ['status'],
          where: { status : "order_confirmed"},
          include: [
            {
              model: transaction_details,
              where: { product_id },
              include: [
                {
                  model: products,
                },
              ],
            },
          ],
        },
      ],
    });
    res.send({
    status: "Success",
    message: "Fetch Stock Opname Success",
    data: {
        resGetStockOpname
    }
    })
    } catch (error) {
     next(error)   
    }
}


router.get('/:product_id', getStockOpname)

module.exports = router