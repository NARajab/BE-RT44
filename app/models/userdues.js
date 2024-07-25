"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserDues extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserDues.belongsTo(models.User, { foreignKey: "userId" });

      UserDues.belongsTo(models.Dues, {
        foreignKey: {
          name: "duesId",
        },
        as: "Dues",
      });
    }
  }
  UserDues.init(
    {
      userId: DataTypes.INTEGER,
      duesId: DataTypes.INTEGER,
      duesStatus: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "UserDues",
    }
  );
  return UserDues;
};
