const express = require('express');
const router = express.Router();
const { users } = require('../../../models');
const { auth } = require('../../helpers/auth');
const { hash, compare } = require('../../lib/bcryptjs');

const changePassword = async (req, res, next) => {
  try {
    console.log(req.headers);
    const { user_id } = req.user;
    const { oldPassword, password } = req.body;

    console.log(user_id, oldPassword);
    const resFindUser = await users.findOne({
      where: { user_id },
    });

    if (resFindUser) {
      const user = resFindUser.dataValues;
      console.log(`pass yang ini ${oldPassword}`);
      const isPasswordMatch = compare(oldPassword, user.password);
      console.log(isPasswordMatch);
      if (isPasswordMatch) {
        const encryptedPassword = hash(password);
        const resUpdatePassword = await users.update(
          {
            password: encryptedPassword,
          },
          {
            where: { user_id },
          },
        );
        res.send({
          status: 'success',
          message: 'password updated',
          result: resUpdatePassword,
        });
      } else {
        throw {
          code: 406,
          message: 'incorrect password',
          errorType: 'Incorrect password',
        };
      }
    }
  } catch (error) {
    next(error);
  }
};

router.patch('/changepassword', auth, changePassword);

module.exports = router;
