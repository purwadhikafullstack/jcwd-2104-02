const express = require('express');
const router = express.Router();

const postUserRegisterRouter = require('./register');
const userVerifyRouter = require('./verifyuser')

router.use(postUserRegisterRouter);
router.use(userVerifyRouter);

module.exports = router;