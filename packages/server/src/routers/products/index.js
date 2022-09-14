const express = require('express');
const router = express.Router();

const postProductsRouter = require('./post.products');

router.use(postProductsRouter);

module.exports = router;
