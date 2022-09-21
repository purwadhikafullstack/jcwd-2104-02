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
      transactions.belongsTo(models.users, {
        foreignKey: 'user_id',
      });
      transactions.belongsTo(models.prescriptions, {
        foreignKey: 'prescription_id',
      });
      transactions.belongsTo(models.addresses, {
        foreignKey: 'address_id',
      });
    }
  }
  transactions.init(
    {
      transaction_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
      address_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'addresses',
          key: 'address_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      status: {
        type: DataTypes.ENUM(
          'awaiting_payment',
          'awaiting_payment_confirmation',
          'processing_order',
          'order_cancelled',
          'delivering_order',
          'order_confirmed',
        ),
        defaultValue: 'awaiting_payment',
      },
    },
    {
      sequelize,
      modelName: 'transactions',
    },
  );
  return transactions;
};
