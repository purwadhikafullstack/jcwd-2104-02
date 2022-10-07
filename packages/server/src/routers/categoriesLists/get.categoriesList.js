const express = require('express');
const router = express.Router();
const { categories_list } = require('../../../models');
const { Sequelize } = require('sequelize');


const getCategoryLists = async (req,res,next)=>{
    try {

      const {page} = req.body
      const {limit} = req.body
  
      const getCategory = await categories_list.findAll({
        offset:(page - 1) * limit,
        limit,
      });

      const resGetNextPage = await categories_list.findAll({
      offset: page * limit,
      limit,
    });

    let hasMore = true;

    if (!resGetNextPage.length) {
      hasMore = false;
    }

      res.send({
        hasMore,
        status: 'Success',
        message: 'Success get All Category',
        data: {
          getCategory,
        },
      });
    } catch (error) {
        next(error)
    }
}

router.post('/categoryList', getCategoryLists);

module.exports = router;