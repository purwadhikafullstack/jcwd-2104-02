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
  stock_opname,
} = require('../../../models');

async function updateProductController(req, res, next) {
  try {
    const { productInputs, currentProduct } = req.body;

    const { product_id } = req.params;

    const categorySplit = productInputs.categoryInfo.split('=-=');
    const resFindProduct = await products.findOne({ where: { product_id } });

    const extName = productInputs.productImage.split('.');

    const resUpdateProduct = await resFindProduct.update({
      productName: productInputs.productName,
      productPrice: productInputs.productPrice,
      productImage: `http://localhost:8000/public/productImages/${product_id}.${extName[1]}`,
      description: productInputs.description,
      defaultQuantity: productInputs.defaultQuantity,
      productStock: productInputs.productStock,
      packageType: productInputs.packageType,
      servingType: productInputs.servingType,
    });

    const resCreateCategory = await categories.create({
      category_lists_id: categorySplit[0],
      product_id: resUpdateProduct.dataValues.product_id,
      categoryName: categorySplit[1],
    });

    const resDeleteProductDetails = await product_details.destroy({
      where: { product_id },
    });

    // for (let i = 0; i < productInputs.productStock; i++) {
    //   await product_details.create({
    //     product_id: resUpdateProduct.dataValues.product_id,
    //     quantity: productInputs.defaultQuantity,
    //     current_quantity: productInputs.defaultQuantity,
    //     isOpen: false,
    //     isAvailable: true,
    //   });
    // }

    res.send({
      status: 'success',
      resUpdateProduct,
    });
  } catch (error) {
    next(error);
  }
}

const addProductStock = async (req, res, next) => {
  try {
    const { productStock } = req.body;

    const { product_id } = req.params;

    const getProductStock = await products.findOne({
      where: {
        product_id,
      },
      raw: true,
    });

    const totalStock = getProductStock['productStock'] + productStock;

    const addProductStock = await products.update(
      { productStock: totalStock },
      {
        where: {
          product_id,
        },
      },
    );

    const createHistoryProduct = await stock_opname.create(
      { product_id, activity: 'tambah_stock', stock: productStock },
      {
        where: {
          product_id,
        },
      },
    );

    res.send({
      status: 'Success',
      message: 'Add Product Stock Success',
      data: createHistoryProduct,
    });
  } catch (error) {
    next(error);
  }
};

const updateAddedStock = async (req, res, next) => {
  try {
    const { productStock } = req.body;
    const { product_id } = req.params;
    const { stock_opname_id } = req.params;

    const getStockOpnameID = await stock_opname.findOne({
      where: {
        stock_opname_id,
      },
      raw: true,
    });

    const getProductStock = await products.findOne({
      where: {
        product_id,
      },
      raw: true,
    });

    let remainingTotal =
      getProductStock['productStock'] +
      Math.abs(getStockOpnameID['stock'] - productStock);

    if (productStock < getStockOpnameID['stock']) {
      remainingTotal =
        getProductStock['productStock'] -
        (getStockOpnameID['stock'] - productStock);
    }

    const addProductStock = await products.update(
      { productStock: remainingTotal },
      {
        where: {
          product_id,
        },
      },
    );

    const createHistoryProduct = await stock_opname.update(
      { stock: productStock },
      {
        where: {
          product_id,
          stock_opname_id,
        },
      },
    );
    res.send({
      status: 'Success',
      message: 'Update Added Product Success',
    });
  } catch (error) {
    next(error);
  }
};

router.patch('/productsUpdate/:product_id', updateProductController);
router.patch('/addStock/:product_id', addProductStock);
router.patch(
  '/updateAddedStock/:product_id/:stock_opname_id',
  updateAddedStock,
);

module.exports = router;
