const express = require('express');
const router = express.Router();
const { auth } = require('../../helpers/auth');
const {carts} = require("../../../models")


const patchCart = async (req, res, next) =>{
    try {
        const {user_id} = req.user
        const {cart_id} = req.params
        const {quantity} = req.body

        const quantityPatched = await carts.update(
            {
                quantity,
            },
      {
          where: {
              cart_id,
              user_id,
            },
        },
        );
        console.log(quantityPatched);
    res.send({
      status: 'Succsess',
      message: 'Succsess Edit Cart',
      data: {
        quantityPatched,
      },
    });
    } catch (error) {
        next(error)
    }
}

router.patch('/patchCart/:cart_id', auth, patchCart)
module.exports = router