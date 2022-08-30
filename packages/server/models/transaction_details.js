'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      transaction_details.hasOne(models.transactions, {
        foreignKey: 'transaction_id',
      });
      transaction_details.hasOne(models.users, {
        foreignKey: 'user_id',
      });
      transaction_details.hasOne(models.carts, {
        foreignKey: 'cart_id',
      });
    }
  }
  transaction_details.init(
    {
      transaction_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'transactions',
          key: 'transaction_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      cart_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'carts',
          key: 'cart_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'transaction_details',
    },
  );
  return transaction_details;
};
