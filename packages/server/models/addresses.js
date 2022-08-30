'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class addresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      addresses.hasOne(models.users, {
        foreignKey: 'user_id',
      });
    }
  }
  addresses.init(
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
      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      recipient: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      postalCode: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'addresses',
    },
  );
  return addresses;
};
