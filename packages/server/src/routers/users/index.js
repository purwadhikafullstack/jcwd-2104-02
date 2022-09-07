const express = require('express');
const router = express.Router();

const postUserRegisterRouter = require('./post.user');
const userVerifyRouter = require('./get.user')

router.use(postUserRegisterRouter);
router.use(userVerifyRouter);

module.exports = router;