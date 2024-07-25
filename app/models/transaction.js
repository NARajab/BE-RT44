"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.Dues, {
        foreignKey: {
          name: "duesId",
          allowNull: false,
        },
        as: "Dues",
      });
      Transaction.belongsTo(models.User, {
        foreignKey: {
          name: "userId",
          allowNull: false,
        },
      });
    }
  }
  Transaction.init(
    {
      userId: DataTypes.INTEGER,
      duesId: DataTypes.INTEGER,
      totalPrice: DataTypes.FLOAT,
      linkProofPayment: DataTypes.STRING,
      date: DataTypes.STRING,
      verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
