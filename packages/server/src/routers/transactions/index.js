const express = require('express');
const router = express.Router();


const postTransactionsRouter = require('./post.transactions');


router.use(postTransactionsRouter);

module.exports = router;