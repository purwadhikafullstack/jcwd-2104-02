const express = require('express');
const router = express.Router();
const { auth } = require('../../helpers/auth');
const { users } = require('../../../models');
const { verifyToken } = require('../../lib/token');

const verifyUserController = async (req, res, next) => {
  try {
    const { token } = req.params;

    console.log({token});

    // const getUserToken = await users.findOne({
    //   where: { token },
    // });

    // if (!getUserToken)
    //   return res.send(
    //     '<h2>your token has expired, please use the new token</h2>',
    //   );

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
      res.send(`<html>
  <head>
    <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap" rel="stylesheet">
  </head>
    <style>
      body {
        text-align: center;
        padding: 40px 0;
        background: #EBF0F5;
      }
        h1 {
          color: #88B04B;
          font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
          font-weight: 900;
          font-size: 40px;
          margin-bottom: 10px;
        }
        p {
          color: #404F5E;
          font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
          font-size:20px;
          margin: 0;
        }
      i {
        color: #9ABC66;
        font-size: 100px;
        line-height: 200px;
        margin-left:-15px;
      }
      .card {
        background: white;
        padding: 60px;
        border-radius: 4px;
        box-shadow: 0 2px 3px #C8D0D8;
        display: inline-block;
        margin: 0 auto;
      }
    </style>
    <body>
      <div class="card">
      <div style="border-radius:200px; height:200px; width:200px; background: #F8FAF5; margin:0 auto;">
        <i class="checkmark">✓</i>
      </div>
        <h1>Success</h1> 
        <p>We received your verification<br/> Go to Homepage <a href="http://localhost:3000">link</a></p>
      </div>
    </body>
</html>`);
    }
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    const resGetUser = await users.findOne({
      where: { user_id },
    });

    const { dataValues } = resGetUser;

    res.send({ dataValues });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const getUserProfileController = async (req, res, next) => {
  try {
    const user_id = req.params;

    const resGetUser = await users.findAll({
      where: user_id,
      raw: true,
    });

    if (!resGetUser.length) throw { message: 'User not found' };

    const result = {
      status: 'Success',
      message: 'User Profile',
      data: {
        result: resGetUser[0],
      },
    };

    console.log(result);

    res.send(result);
  } catch (error) {
    next(error);
  }
};

router.get('/profile/:user_id', auth, getUserProfileController);
router.get('/verification/:token', verifyUserController);
router.get('/:user_id', getUser);

module.exports = router;
