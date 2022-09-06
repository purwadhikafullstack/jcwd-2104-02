const express = require('express');
const router = express.Router();
const { users } = require('../../../models');
const { verifyToken } = require('../../lib/token');

const verifyUserController = async (req, res, next) => {
  try {
    const { token } = req.params;

    const verifiedToken = verifyToken(token);



    const IsVerifiedStatus = await users.update(
      { isVerified: true },
      {
        where: {
          user_id: verifiedToken.user_id,
        },
      },
    );

    if (!IsVerifiedStatus) {
      throw { message: 'Verification failed' };
    } else {
      res.send('<h1>Verification Success</h1>');
    }
  } catch (error) {
    next(error);
  }
};

    
router.get('/verification/:token', verifyUserController);

module.exports = router;