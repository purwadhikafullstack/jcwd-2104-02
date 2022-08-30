'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      categories.hasOne(models.products, {
        foreignKey: 'product_id',
      });
    }
  }
  categories.init(
    {
      categoryName: {
        type: DataTypes.STRING,
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
    },
    {
      sequelize,
      modelName: 'categories',
    },
  );
  return categories;
};
