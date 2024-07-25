"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Dues extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Dues.hasMany(models.UserDues, {
        foreignKey: "duesId",
        allowNull: false,
      });
      Dues.hasMany(models.Transaction, {
        foreignKey: {
          name: "duesId",
          allowNull: false,
        },
      });
      Dues.hasMany(models.UserDues, {
        foreignKey: "duesId",
        allowNull: false,
      });
    }
  }
  Dues.init(
    {
      duesName: DataTypes.STRING,
      duesType: {
        type: DataTypes.ENUM(["Wajib", "Sukarela"]),
      },
      date: { type: DataTypes.STRING, allowNull: true },
      price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Dues",
    }
  );
  return Dues;
};
