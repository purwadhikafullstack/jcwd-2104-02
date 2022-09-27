const express = require('express');
const router = express.Router();

const deleteProductsRouter = require('./delete.products');
const patchProductsRouter = require('./patch.products');
const postProductsRouter = require('./post.products');

router.use(deleteProductsRouter);
router.use(patchProductsRouter);
router.use(postProductsRouter);

module.exports = router;
