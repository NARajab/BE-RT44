const { Umkm } = require("../models");
const { Op } = require("sequelize");
const path = require("path");

const imagekit = require("../libs/imagekit");
const ApiError = require("../../utils/apiError");

const createUmkm = async (req, res, next) => {
  const umkmBody = req.body;
  const file = req.file;
  let imageUrl;
  try {
    if (file) {
      const filename = file.originalname;
      const extension = path.extname(filename);
      const uploadImage = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      });
      imageUrl = uploadImage.url;
    }
    const newUmkm = await Umkm.create({
      ...umkmBody,
      imageUrl,
    });

    res.status(201).json({
      status: "Success",
      newUmkm,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const updateUmkm = async (req, res, next) => {
  const id = req.params.id;
  const umkmBody = req.body;
  const file = req.file;
  const condition = {
    where: {
      id,
    },
    returning: true,
  };
  let imageUrl;
  try {
    if (file) {
      const filename = file.originalname;
      const extension = path.extname(filename);
      const uploadImage = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      });
      imageUrl = uploadImage.url;
    }
    const umkmUpdated = await Umkm.update(
      {
        ...umkmBody,
        imageUrl,
      },
      condition
    );
    res.status(201).json({
      status: "Success",
      umkmUpdated,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const getAllUmkm = async (req, res, next) => {
  try {
    const allUmkm = await Umkm.findAll();
    res.status(200).json({
      status: "Success",
      allUmkm,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const getOnceUmkm = async (req, res, next) => {
  let umkm;
  try {
    if (req.params.id) {
      umkm = await Umkm.findByPk(req.params.id);
    } else if (req.query.name) {
      umkm = await Umkm.findAll({
        where: {
          name: { [Op.iLike]: `%${req.query.name.toLowerCase()}%` },
        },
      });
    } else {
      return next(new ApiError("Umkm tidak ditemukan", 404));
    }
    res.status(200).json({
      status: "Success",
      umkm,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const deleteUmkm = async (req, res, next) => {
  const id = req.params.id;
  try {
    const deletedUmkm = await Umkm.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      status: "Success",
      message: "Berhasil menghapus UMKM",
      deletedUmkm,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  createUmkm,
  getAllUmkm,
  getOnceUmkm,
  updateUmkm,
  deleteUmkm,
};
