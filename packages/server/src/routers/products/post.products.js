const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const { Sequelize } = require('sequelize');
const { products, sequelize } = require('../../../models');
const { categories } = require('../../../models');
const { categories_list } = require('../../../models');

async function getAllProductsController(req, res, next) {
  try {
    const { page } = req.body;

    const resGetAllProducts = await products.findAll({
      offset: (page - 1) * 10,
      limit: 10,
    });

    const resGetNextPage = await products.findAll({
      offset: page * 10,
      limit: 10,
    });

    console.log({ resGetNextPage });

    let hasMore = true;

    if (!resGetNextPage.length) {
      hasMore = false;
    }

    res.send({
      hasMore,
      status: 'success',
      products: resGetAllProducts,
    });
  } catch (error) {
    next(error);
  }
}

async function getSpecificProductsController(req, res, next) {
  try {
    const { page } = req.body;
    const { specifics } = req.params;

    const resGetCategories = await categories.findAll({
      where: { categoryName: specifics },
      offset: (page - 1) * 10,
      limit: 10,
    });

    const resCheckCategories = await categories_list.findAll({
      where: { category: specifics },
    });

    console.log({ categoryAvailable: resCheckCategories.length });

    if (!resCheckCategories.length) {
      const resGetByKeyword = await sequelize.query(
        `SELECT * FROM medbox.products WHERE productName LIKE '%${specifics}%' LIMIT ${
          (page - 1) * 10
        },10;`,
        { type: QueryTypes.SELECT },
      );

      const resGetByKeywordNext = await sequelize.query(
        `SELECT * FROM medbox.products WHERE productName LIKE '%${specifics}%' LIMIT ${
          page * 10
        },10;`,
        { type: QueryTypes.SELECT },
      );

      console.log({ resGetByKeyword });

      let hasMore = true;

      if (!resGetByKeywordNext.length) {
        hasMore = false;
      }

      res.send({
        status: 'success',
        products: resGetByKeyword,
        hasMore,
      });
    }

    const resGetNextPage = await categories.findAll({
      where: { categoryName: specifics },
      offset: page * 10,
      limit: 10,
    });

    let hasMore = true;

    if (!resGetNextPage.length) {
      hasMore = false;
    }

    const productsIdMap = resGetCategories.map((category) => {
      return category.dataValues.product_id;
    });

    let finalProducts = [];

    let resGetProducts;

    for (let product_id of productsIdMap) {
      resGetProducts = await products.findOne({ where: { product_id } });
      finalProducts.push(resGetProducts.dataValues);
    }

    console.log({ specifics });
    console.log({ resGetCategories });
    console.log({ productsIdMap });
    console.log({ finalProducts });

    res.send({
      status: 'success',
      products: finalProducts,
      hasMore,
    });
  } catch (error) {
    next(error);
  }
}

async function getAllProductsSortedController(req, res, next) {
  try {
    const { page } = req.body;

    const { sortOrder } = req.params;

    const splitOrder = sortOrder.split('=');

    console.log({ sortOrder, splitOrder });
    console.log({ page });

    const resGetAllProducts = await products.findAll({
      order: [[splitOrder[1], splitOrder[2]]],
      offset: (page - 1) * 10,
      limit: 10,
    });

    const resGetNextPage = await products.findAll({
      order: [[splitOrder[1], splitOrder[2]]],
      offset: page * 10,
      limit: 10,
    });

    let hasMore = true;

    if (!resGetNextPage.length) {
      hasMore = false;
    }

    res.send({
      hasMore,
      status: 'success',
      products: resGetAllProducts,
    });
  } catch (error) {
    next(error);
  }
}

router.post('/sort/:sortOrder', getAllProductsSortedController);
router.post('/:specifics', getSpecificProductsController);
router.post('/', getAllProductsController);

module.exports = router;
