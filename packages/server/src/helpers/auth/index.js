const { verifyToken } = require('../../lib/token');
const { users } = require('../../../models');

const auth = async (req, res, next) => {
  try {
    console.log('3213');

    const token = req.token;
    if (!token) {
      throw new Error('failed');
    }

    const verifiedToken = verifyToken(token);
    const resGetUser = await users.findOne({
      where: {
        user_id: verifiedToken.user_id,
      },
    });

    if (!resGetUser) throw { message: 'User not found' };

    req.user = resGetUser.dataValues;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { auth };
