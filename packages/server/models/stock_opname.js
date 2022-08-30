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
      stock_opname.hasOne(models.users, {
        foreignKey: 'user_id',
      });
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
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
      transaction_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'transactions',
          key: 'transaction_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      transaction_details_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'transaction_details',
          key: 'transaction_details_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    },
    {
      sequelize,
      modelName: 'stock_opname',
    },
  );
  return stock_opname;
};
