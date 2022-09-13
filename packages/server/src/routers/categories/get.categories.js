const express = require('express');
const router = express.Router();
const { categories_list } = require('../../../models');

async function getAllCategoriesController(req, res, next) {
  try {
    const resGetAllCategoriesLists = await categories_list.findAll();

    res.send({
      status: 'success',
      categories: resGetAllCategoriesLists,
    });
  } catch (error) {
    next(error);
  }
}

router.get('/getAll', getAllCategoriesController);

module.exports = router;
