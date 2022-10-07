const express = require('express');
const router = express.Router();

const postStockOpnameRouter = require('./post.stockopname');
const getStockOpnameRouter = require('./get.stockopnames');

router.use(getStockOpnameRouter);
router.use(postStockOpnameRouter);

module.exports = router;
