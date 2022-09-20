const express = require('express');
const router = express.Router();

const postPrescriptionRouter = require('./post.prescription');

router.use(postPrescriptionRouter);

module.exports = router;
