const express = require('express');
const router = express.Router();
const { categories_list } = require('../../../models');
const { Sequelize } = require('sequelize');


const getCategoryLists = async (req,res,next)=>{
    try {

      const {page}= req.params
      
      console.log({page});


      const getCategory = await categories_list.findAll({
        offset:5*(page-1),
        limit:5,
      });

      // console.log(getCategory);

      res.send({
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

const getCategoryPagination = async (req, res, next) => {
  const {
    page = 1,
    pageSize = 5,
  } = req.query;

  const limit = Number(pageSize);
  const offset = (Number(page) - 1) * Number(pageSize);
  try {
    const amount = await categories_list.findAll();
    const resultAdmin = await categories_list.findAll({
      offset,
      limit,
    });

    if (!result.length) {
      throw { code: 404, message: 'Kategory tidak ditemukan' };
    }

    res.send({
      status: 'Success',
      message: 'Success get category list',
      result: result,
      resultAdmin: resultAdmin,
      totalPage: amount.length,
    });
  } catch (error) {
    next(error);
  }
};




router.get('/', getCategoryPagination);
router.get('/categoryList/:page', getCategoryLists);

module.exports = router;