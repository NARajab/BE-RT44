"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserLatter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserLatter.belongsTo(models.User, { foreignKey: "userId" });
      UserLatter.belongsTo(models.Latter, {
        foreignKey: "latterId",
      });
    }
  }
  UserLatter.init(
    {
      userId: DataTypes.INTEGER,
      latterId: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM(["Selesai", "Sedang Proses", "Ditolak"]),
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "UserLatter",
    }
  );
  return UserLatter;
};
