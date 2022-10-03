const express = require('express');
const router = express.Router();
const { categories_list } = require('../../../models');


const getCategoryLists = async (req,res,next)=>{
    try {
      // const {
      //   page = 1,
      //   pageSize = 5,
      // } = req.query;

      //  const limit = Number(pageSize);
      //  const offset = (Number(page) - 1) * Number(pageSize);
      
      const getCategory = await categories_list.findAll();

      console.log(getCategory);

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





router.get('/', getCategoryLists);

module.exports = router;