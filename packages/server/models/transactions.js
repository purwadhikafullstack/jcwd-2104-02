'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      transactions.hasOne(models.users, {
        foreignKey: 'user_id',
      });
      transactions.hasOne(models.prescriptions, {
        foreignKey: 'prescription_id',
      });
    }
  }
  transactions.init(
    {
      prescription_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'prescriptions',
          key: 'prescription_id',
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
      status: {
        type: DataTypes.ENUM('Pending', 'Success', 'Failed'),
      },
    },
    {
      sequelize,
      modelName: 'transactions',
    },
  );
  return transactions;
};
