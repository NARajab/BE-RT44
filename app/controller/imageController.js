const { ImageUmkm, Umkm } = require("../models");
const path = require("path");

const imagekit = require("../libs/imagekit");
const ApiError = require("../../utils/apiError");

const addImage = async (req, res, next) => {
  const { umkmId } = req.params;
  const umkm = await Umkm.findOne({
    where: {
      id: umkmId,
    },
  });
  const file = req.file;
  let imageUrl;
  try {
    if (!umkm) {
      return next(new ApiError("Umkm tidak ditemukan", 404));
    }
    if (file) {
      const filename = file.originalname;
      const extension = path.extname(filename);
      const uploadImage = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      });
      imageUrl = uploadImage.url;
    }
    const newImage = await ImageUmkm.create({
      umkmId: umkmId,
      imageUrl,
    });

    res.status(201).json({
      status: "Success",
      newImage,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findAll = async (req, res, next) => {
  try {
    const allImage = await ImageUmkm.findAll({
      include: ["Umkm"],
    });
    res.status(200).json({
      status: "Success",
      allImage,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findByIdUmkm = async (req, res, next) => {
  const { umkmId } = req.params;
  try {
    const umkm = await Umkm.findOne({
      where: {
        id: umkmId,
      },
    });
    if (!umkm) {
      return next(new ApiError("Umkm tidak ditemukan", 404));
    }
    const allImage = await ImageUmkm.findAll({
      where: {
        umkmId,
      },
    });
    res.status(200).json({
      status: "Success",
      allImage,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const updateImage = async (req, res, next) => {
  const { id } = req.params;
  const image = await ImageUmkm.findOne({
    where: {
      id,
    },
  });
  const file = req.file;
  let imageUrl;
  const condition = {
    where: {
      id,
    },
    returning: true,
  };
  try {
    if (!image) {
      return next(new ApiError("Pengguna tidak ditemukan", 404));
    }
    if (file) {
      const filename = file.originalname;
      const extension = path.extname(filename);
      const uploadImage = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      });
      imageUrl = uploadImage.url;
    }
    const [_, [imageUpdateData]] = await ImageUmkm.update(
      {
        imageUrl,
      },
      condition
    );
    const imageUpdate = imageUpdateData.toJSON();
    res.status(201).json({
      status: "Success",
      imageUpdate,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  addImage,
  findAll,
  findByIdUmkm,
  updateImage,
};
