const express = require('express');
const router = express.Router();

const getPrescriptionRouter = require('./get.prescription');
const postPrescriptionRouter = require('./post.prescription');

router.use(getPrescriptionRouter);
router.use(postPrescriptionRouter);

module.exports = router;
