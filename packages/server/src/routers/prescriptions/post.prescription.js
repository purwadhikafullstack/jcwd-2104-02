const express = require('express');
const router = express.Router();
const { prescriptions } = require('../../../models');
const { auth } = require('../../helpers/auth');
const { uploadPrescriptionImage } = require('../../lib/multer');

const createUserPrescriptionImage = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const { filename } = req.file;
    const finalFileName = `/public/prescriptionImage/${filename}`;

    const resCreateUserPrescriptionImage = await prescriptions.create(
      {
        prescriptionImage: finalFileName,
        user_id,
      },
      {
        where: {
          user_id,
        },
      },
    );

    if (resCreateUserPrescriptionImage.affectedRows)
      throw { message: 'Failed to update avatar' };

    res.send({
      status: 'Success',
      message: 'Upload Prescription Image Success',
    });
  } catch (error) {
    next(error);
  }
};

router.post(
  '/uploadPrescriptionImage',
  auth,
  uploadPrescriptionImage.single('prescriptionImage'),
  createUserPrescriptionImage,
);

module.exports = router;
