const { Latter, User, UserLatter } = require("../models");
const { Op } = require("sequelize");

const ApiError = require("../../utils/apiError");

// const {
//   sendMessageLatterToRt,
//   sendMessageToWarga,
// } = require("../../utils/sendMessage");

const createLatter = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id,
    },
  });
  const latterBody = req.body;
  try {
    if (!user) {
      return next(new ApiError("Pengguna tidak ditemukan", 404));
    }

    const currentDate = new Date();

    const day = currentDate.getDate();

    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const monthIndex = currentDate.getMonth();
    const month = monthNames[monthIndex];

    const year = currentDate.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;

    const newLatter = await Latter.create({
      ...latterBody,
      date: formattedDate,
    });

    const newUserLatter = await UserLatter.create({
      userId: id,
      latterId: newLatter.id,
      status: "Sedang Proses",
    });

    const pakRT = await User.findOne({
      where: {
        role: "superAdmin",
      },
    });
    // await sendMessageLatterToRt(pakRT.phoneNumber);

    res.status(201).json({
      status: "Success",
      newLatter,
      newUserLatter,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findAllUserLatter = async (req, res, next) => {
  try {
    const userLatter = await UserLatter.findAll({
      include: ["Latter", "User"],
    });
    const latterProcessCount = userLatter.filter(
      (latter) => latter.status === "Sedang Proses"
    ).length;
    const latterDoneCount = userLatter.filter(
      (latter) => latter.status === "Selesai"
    ).length;
    res.status(200).json({
      status: "Success",
      userLatter,
      latterProcessCount,
      latterDoneCount,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findOnceUserLatterByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userLatter = await UserLatter.findAll({
      where: {
        userId,
      },
      include: ["Latter"],
    });
    res.status(200).json({
      status: "Success",
      userLatter,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findOnceUserLatter = async (req, res, next) => {
  try {
    let { userId, latterId } = req.params;
    const { name, latterType } = req.query;

    userId = userId ? userId : null;
    latterId = latterId ? latterId : null;

    const whereCondition = {};
    if (name) {
      whereCondition[Op.or] = [
        { "$User.name$": { [Op.iLike]: `%${name.toLowerCase()}%` } },
        { "$Latter.fullName$": { [Op.iLike]: `%${name.toLowerCase()}%` } },
      ];
    }

    if (latterType) {
      whereCondition["$Latter.latterType$"] = latterType;
    }

    if (userId !== null) {
      whereCondition.userId = userId;
    }
    if (latterId !== null) {
      whereCondition.latterId = latterId;
    }

    const userLatter = await UserLatter.findOne({
      where: whereCondition,
      include: ["Latter", "User"],
    });

    if (!userLatter) {
      if (name) {
        return next(
          new ApiError("Data dengan nama yang diberikan tidak ditemukan", 404)
        );
      }
      if (latterType) {
        return next(
          new ApiError(
            "Data dengan latterType yang diberikan tidak ditemukan",
            404
          )
        );
      }
      return next(new ApiError("User tidak ditemukan", 404));
    }

    res.status(200).json({
      status: "Success",
      userLatter,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findByStatus = async (req, res, next) => {
  try {
    const latter = await UserLatter.findAll({
      where: {
        status: "Sedang Proses",
      },
    });
    res.status(200).json({
      status: "Success",
      latter,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const updateLatter = async (req, res, next) => {
  const { id } = req.params;
  const latter = await Latter.findOne({
    where: {
      id,
    },
  });
  const latterBody = req.body;
  const condition = {
    where: {
      id,
    },
    returning: true,
  };
  try {
    if (!latter) {
      return next(new ApiError("Surat tidak ditemukan", 404));
    }

    const [_, [updateDataLatter]] = await Latter.update(
      { ...latterBody },
      condition
    );

    const updateLatter = updateDataLatter.toJSON();

    res.status(200).json({
      status: "Success",
      data: updateLatter,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findAllLatter = async (req, res, next) => {
  try {
    const latter = await Latter.findAll();
    res.status(200).json({
      status: "Success",
      latter,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findOnceLatter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const latter = await Latter.findOne({
      where: {
        id,
      },
    });
    if (!latter) {
      return next(new ApiError("User tidak ditemukan", 404));
    }
    res.status(200).json({
      status: "Success",
      latter,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const updateStatus = async (req, res, next) => {
  const { latterId } = req.params;
  const statusBody = req.body;
  const userLatter = await UserLatter.findOne({
    where: {
      latterId,
    },
  });
  try {
    if (!userLatter) {
      return next(new ApiError("UserLatter tidak ditemukan", 404));
    }
    const userId = userLatter.userId;

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return next(new ApiError("Pengguna tidak ditemukan", 404));
    }
    const phoneNumber = user.phoneNumber;
    await userLatter.update({ ...statusBody });

    // await sendMessageToWarga(phoneNumber);

    res.status(200).json({
      status: "Success",
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  createLatter,
  updateLatter,
  updateStatus,
  findAllUserLatter,
  findOnceUserLatter,
  findByStatus,
  findOnceUserLatterByUserId,
  findAllLatter,
  findOnceLatter,
};
