const express = require('express');
const router = express.Router();

const postCartController = require('./post.cart')
const patchCartController = require("./patch.cart")

router.use(patchCartController)
router.use(postCartController)


module.exports = router;