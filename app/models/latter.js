"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Latter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Latter.hasMany(models.UserLatter, {
        foreignKey: "latterId",
        allowNull: false,
      });
    }
  }
  Latter.init(
    {
      latterType: {
        type: DataTypes.ENUM(["Surat Pengantar", "Surat Keterangan"]),
      },
      fullName: DataTypes.STRING,
      address: DataTypes.STRING,
      gender: {
        type: DataTypes.ENUM(["Pria", "Wanita"]),
      },
      placeDateBday: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM(["Belum Kawin", "Kawin", "Janda/Duda"]),
      },
      religion: DataTypes.STRING,
      work: DataTypes.STRING,
      blood: DataTypes.STRING,
      citizenship: {
        type: DataTypes.ENUM(["WNI", "WNA"]),
      },
      nik: DataTypes.STRING,
      nkk: DataTypes.STRING,
      perpous: DataTypes.STRING,
      numberFollower: DataTypes.INTEGER,
      destinationAddress: DataTypes.STRING,
      date: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Latter",
    }
  );
  return Latter;
};
