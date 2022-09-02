'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class prescriptions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      prescriptions.hasOne(models.users, {
        foreignKey: 'user_id',
      });
      prescriptions.hasOne(models.products, {
        foreignKey: 'product_id',
      });
      prescriptions.hasOne(models.transactions, {
        foreignKey: 'prescription_id',
      });
    }
  }
  prescriptions.init(
    {
      prescription_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
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
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'products',
          key: 'product_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      productQuantity: {
        type: DataTypes.INTEGER,
      },
      unitQuantity: {
        type: DataTypes.INTEGER,
      },
      isCompletetd: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'prescriptions',
    },
  );
  return prescriptions;
};
