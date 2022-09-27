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

const productImagePath = path.join(
  appRoot.path,
  'packages',
  'server',
  'public',
  'productImages',
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

const productImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, productImagePath);
  },
  filename: function (req, file, cb) {
    const { product_filename } = req.params;
    cb(null, `${product_filename}`);
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

const uploadProductImage = multer({
  storage: productImageStorage,
  limits: {
    fileSize: 10485760,
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

module.exports = { uploadAvatar, uploadProductImage };
