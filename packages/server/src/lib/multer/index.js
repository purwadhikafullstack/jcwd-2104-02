const multer = require('multer');
const path = require('path');
const appRoot = require('app-root-path');

const avatarPath = path.join(
  appRoot.path,
  'packages',
  'server',
  'public',
  'avatar',
);

const prescriptionImagePath = path.join(
  appRoot.path,
  'packages',
  'server',
  'public',
  'prescriptionImage',
);

const storageAvatar = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, avatarPath);
  },
  filename: function (req, file, cb) {
    const { user_id } = req.user;
    cb(null, `${user_id}-avatar.jpg`);
  },
});

const uploadAvatar = multer({
  storage: storageAvatar,
  limits: {
    fileSize: 1048576,
  },
  fileFilter(req, file, cb) {
    const allowedExtension = ['.jpg', '.jpeg', '.png', '.gif'];

    const extname = path.extname(file.originalname);

    if (!allowedExtension.includes(extname)) {
      const error = new Error(
        'Invalid file extension. You can only upload jpg, jpeg, png, or gif file',
      );
      return cb(error);
    }

    cb(null, true);
  },
});

const storagePrescriptionImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, prescriptionImagePath);
  },
  filename: function (req, file, cb) {
    const { user_id } = req.user;
    const prescriptionCount = req.userPrescription.length;
    cb(null, `${user_id}-${prescriptionCount}-prescription.jpg`);
  },
});

const uploadPrescriptionImage = multer({
  storage: storagePrescriptionImage,
  limits: {
    fileSize: 1048576,
  },
  fileFilter(req, file, cb) {
    const allowedExtension = ['.jpg', '.png'];

    const extname = path.extname(file.originalname);

    if (!allowedExtension.includes(extname)) {
      const error = new Error(
        'Invalid file extension. You can only upload jpg or png file',
      );
      return cb(error);
    }

    cb(null, true);
  },
});

module.exports = { uploadAvatar, uploadPrescriptionImage };
