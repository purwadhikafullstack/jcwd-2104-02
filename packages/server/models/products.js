'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      products.hasMany(models.carts, {
        foreignKey: 'product_id',
      });
      products.hasMany(models.categories, {
        foreignKey: 'product_id',
      });
      products.hasMany(models.prescriptions, {
        foreignKey: 'product_id',
      });
      products.hasMany(models.product_details, {
        foreignKey: 'product_id',
      });
      products.hasMany(models.stock_opname, {
        foreignKey: 'product_id',
      });
    }
  }
  products.init(
    {
      product_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      productName: {
        type: DataTypes.STRING(45),
      },
      productPrice: {
        type: DataTypes.INTEGER,
      },
      productImage: {
        type: DataTypes.STRING(255),
      },
      description: {
        type: DataTypes.STRING,
      },
      productStock: {
        type: DataTypes.INTEGER,
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'products',
    },
  );
  return products;
};
