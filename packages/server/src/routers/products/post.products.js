const express = require('express');
const router = express.Router();
const { uploadProductImage } = require('../../lib/multer');
const { auth } = require('../../helpers/auth');
const { QueryTypes } = require('sequelize');
const {
  products,
  sequelize,
  categories,
  categories_list,
  product_details,
} = require('../../../models');

async function getAllProductsController(req, res, next) {
  try {
    const { page } = req.body;
    const { limit } = req.body;

    const resGetAllProducts = await products.findAll({
      offset: (page - 1) * limit,
      limit,
    });

    const resGetNextPage = await products.findAll({
      offset: page * limit,
      limit,
    });

    let hasMore = true;

    if (!resGetNextPage.length) {
      hasMore = false;
    }

    for (let product of resGetAllProducts) {
      const resGetEachCategory = await categories.findOne({
        where: { product_id: product.product_id },
      });

      const resGetProductDefaultQuantity = await product_details.findOne({
        where: { product_id: product.product_id },
      });

      const resGetCategoriesLists = resGetEachCategory
        ? await categories_list.findOne({
            where: {
              category_lists_id:
                resGetEachCategory?.dataValues.category_lists_id,
            },
          })
        : '';

      product.dataValues.category_lists_id =
        resGetCategoriesLists?.dataValues?.category_lists_id;

      product.dataValues.category = resGetEachCategory?.dataValues.categoryName;

      product.dataValues.category_id =
        resGetEachCategory?.dataValues.category_id;

      product.dataValues.defaultQuantity =
        resGetProductDefaultQuantity?.dataValues.quantity;
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
    const { limit } = req.body;
    const { specifics } = req.params;

    const resGetCategories = await categories.findAll({
      where: { categoryName: specifics },
      offset: (page - 1) * limit,
      limit,
    });

    const resCheckCategories = await categories_list.findAll({
      where: { category: specifics },
    });

    console.log({ categoryAvailable: resCheckCategories.length });

    if (!resCheckCategories.length) {
      const resGetByKeyword = await sequelize.query(
        `SELECT * FROM medbox.products WHERE productName LIKE '%${specifics}%' LIMIT ${
          (page - 1) * limit
        },${limit};`,
        { type: QueryTypes.SELECT },
      );

      const resGetByKeywordNext = await sequelize.query(
        `SELECT * FROM medbox.products WHERE productName LIKE '%${specifics}%' LIMIT ${
          page * limit
        },${limit};`,
        { type: QueryTypes.SELECT },
      );

      console.log({ resGetByKeyword });

      let hasMore = true;

      if (!resGetByKeywordNext.length) {
        hasMore = false;
      }

      for (let product of resGetByKeyword) {
        const resGetEachCategory = await categories.findOne({
          where: { product_id: product.product_id },
        });

        const resGetProductDefaultQuantity = await product_details.findOne({
          where: { product_id: product.product_id },
        });

        const resGetCategoriesLists = resGetEachCategory
          ? await categories_list.findOne({
              where: {
                category_lists_id:
                  resGetEachCategory?.dataValues.category_lists_id,
              },
            })
          : '';

        product.dataValues.category_lists_id =
          resGetCategoriesLists?.dataValues?.category_lists_id;

        product.category = resGetEachCategory?.dataValues.categoryName;

        product.category_id = resGetEachCategory?.dataValues.category_id;

        product.defaultQuantity =
          resGetProductDefaultQuantity?.dataValues.quantity;
      }

      res.send({
        status: 'success',
        products: resGetByKeyword,
        hasMore,
      });
    }

    const resGetNextPage = await categories.findAll({
      where: { categoryName: specifics },
      offset: page * limit,
      limit,
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

    for (let product of finalProducts) {
      const resGetEachCategory = await categories.findOne({
        where: { product_id: product.product_id },
      });

      const resGetProductDefaultQuantity = await product_details.findOne({
        where: { product_id: product.product_id },
      });

      const resGetCategoriesLists = resGetEachCategory
        ? await categories_list.findOne({
            where: {
              category_lists_id:
                resGetEachCategory?.dataValues.category_lists_id,
            },
          })
        : '';

      product.category = resGetEachCategory?.dataValues.categoryName;

      product.dataValues.category_lists_id =
        resGetCategoriesLists?.dataValues?.category_lists_id;

      product.category_id = resGetEachCategory?.dataValues.category_id;

      product.defaultQuantity =
        resGetProductDefaultQuantity?.dataValues.quantity;
    }

    // console.log({ specifics });
    // console.log({ resGetCategories });
    // console.log({ productsIdMap });
    // console.log({ finalProducts });

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
    const { limit } = req.body;

    const { sortOrder } = req.params;

    const splitOrder = sortOrder.split('=');

    console.log({ sortOrder, splitOrder });
    console.log({ page });

    const resGetAllProducts = await products.findAll({
      order: [[splitOrder[1], splitOrder[2]]],
      offset: (page - 1) * limit,
      limit,
    });

    const resGetNextPage = await products.findAll({
      order: [[splitOrder[1], splitOrder[2]]],
      offset: page * limit,
      limit,
    });

    let hasMore = true;

    if (!resGetNextPage.length) {
      hasMore = false;
    }

    for (let product of resGetAllProducts) {
      const resGetEachCategory = await categories.findOne({
        where: { product_id: product.product_id },
      });

      console.log(resGetEachCategory?.dataValues.category_lists_id);

      const resGetCategoriesLists = resGetEachCategory
        ? await categories_list.findOne({
            where: {
              category_lists_id:
                resGetEachCategory?.dataValues.category_lists_id,
            },
          })
        : '';

      const resGetProductDefaultQuantity = await product_details.findOne({
        where: { product_id: product.product_id },
      });

      console.log({ resGetCategoriesLists });

      product.dataValues.category = resGetEachCategory?.dataValues.categoryName;

      product.dataValues.category_lists_id =
        resGetCategoriesLists?.dataValues?.category_lists_id;

      product.dataValues.category_id =
        resGetEachCategory?.dataValues.category_id;

      product.dataValues.defaultQuantity =
        resGetProductDefaultQuantity?.dataValues.quantity;
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

async function postNewProductController(req, res, next) {
  try {
    console.log({ body: req.body });
    const {
      categoryInfo,
      description,
      packageType,
      productImage,
      productName,
      productPrice,
      productStock,
      defaultQuantity,
      servingType,
    } = req.body;

    const imageExtNameSplit = productImage.split('.');
    const categorySplit = categoryInfo.split('=-=');

    const resCreateProduct = await products.create({
      productName,
      productPrice: parseInt(productPrice),
      description,
      productStock: parseInt(productStock),
      servingType,
      isPublic: false,
      packageType,
    });

    await resCreateProduct.update({
      productImage: `http://localhost:8000/public/productImages/${
        resCreateProduct.dataValues.product_id
      }.${imageExtNameSplit[imageExtNameSplit.length - 1]}`,
    });

    const resCreateCategory = await categories.create({
      category_lists_id: categorySplit[0],
      product_id: resCreateProduct.dataValues.product_id,
      categoryName: categorySplit[1],
    });

    for (let i = 0; i < productStock; i++) {
      await product_details.create({
        product_id: resCreateProduct.dataValues.product_id,
        quantity: defaultQuantity,
        current_quantity: defaultQuantity,
        isOpen: false,
        isAvailable: true,
      });
    }

    setTimeout(() => {
      res.send({
        status: 'success',
        resCreateProduct,
        resCreateCategory,
      });
    }, 2000);
  } catch (error) {
    next(error);
  }
}

async function postNewProductImageController(req, res, next) {
  try {
    res.send({
      status: 'success',
      imageName: req.params.product_filename,
    });
  } catch (error) {
    next(error);
  }
}

const getProductDetail = async (req, res, next) => {
  try {
    const { product_id } = req.params;

    const resProductDetail = await products.findOne({
      where: {
        product_id,
      },
    });

    res.send({
      status: 'Success',
      message: 'Success get product detail',
      data: resProductDetail,
    });
  } catch (error) {
    next(error);
  }
};

router.post('/specifics/:specifics', getSpecificProductsController);
router.post('/sort/:sortOrder', getAllProductsSortedController);
router.post('/newProduct', postNewProductController);
router.post('/', getAllProductsController);
router.get('/:product_id', auth, getProductDetail);
router.post(
  '/newProductImage/:product_filename',
  uploadProductImage.single('productImageFile'),
  postNewProductImageController,
);

module.exports = router;
