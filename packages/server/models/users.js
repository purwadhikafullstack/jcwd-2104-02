'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.hasMany(models.addresses, {
        foreignKey: 'user_id',
      });
      users.hasMany(models.carts, {
        foreignKey: 'user_id',
      });
      users.hasMany(models.prescriptions, {
        foreignKey: 'user_id',
      });
      users.hasMany(models.stock_opname, {
        foreignKey: 'user_id',
      });
      users.hasMany(models.transaction_details, {
        foreignKey: 'user_id',
      });
      users.hasMany(models.transactions, {
        foreignKey: 'user_id',
      });
    }
  }
  users.init(
    {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      gender: {
        type: DataTypes.ENUM('Male', 'Female'),
      },
      birthDate: {
        type: DataTypes.DATE,
      },
      phoneNumber: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      avatar: {
        type: DataTypes.STRING(255),
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_token: {
        type: DataTypes.STRING,
      },
      password_token: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'users',
    },
  );
  return users;
};
