'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stock_opname extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      stock_opname.hasOne(models.products, {
        foreignKey: 'product_id',
      });
      stock_opname.hasOne(models.transactions, {
        foreignKey: 'transaction_id',
      });
      stock_opname.hasOne(models.transaction_details, {
        foreignKey: 'transaction_details_id',
      });
    }
  }
  stock_opname.init(
    {
      stock_opname_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'products',
          key: 'product_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      stock: {
        type: DataTypes.INTEGER,
      },
      activity: {
        type: DataTypes.ENUM('terjual', 'tambah_stock', 'unit_conversion'),
      },
    },
    {
      sequelize,
      modelName: 'stock_opname',
    },
  );
  return stock_opname;
};
