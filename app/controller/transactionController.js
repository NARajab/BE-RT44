const { Transaction, Dues, User, UserDues } = require("../models");
const path = require("path");
const imagekit = require("../libs/imagekit");
// const { sendSuccessMessageTransaction } = require("../../utils/sendMessage");

const ApiError = require("../../utils/apiError");
const { where } = require("sequelize");

const createTransactionObligat = async (req, res, next) => {
  const { duesId, userId } = req.params;
  const file = req.file;
  let linkProofPayment;
  try {
    if (!duesId) {
      return next(new ApiError("Dues Id Tidak Ditemukan", 404));
    }
    if (!file) {
      return next(new ApiError("Masukkan bukti pembayaran", 404));
    }
    const dues = await Dues.findByPk(duesId);
    const user = await User.findByPk(userId);

    if (file) {
      const filename = file.originalname;
      const extension = path.extname(filename);
      const uploadImage = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      });
      linkProofPayment = uploadImage.url;
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

    const newTransaction = await Transaction.create({
      userId: user.id,
      duesId: dues.id,
      totalPrice: dues.price,
      linkProofPayment,
      date: formattedDate,
    });

    // await sendSuccessMessageTransaction(req.user.phoneNumber);

    await UserDues.update(
      { duesStatus: true },
      {
        where: {
          duesId: dues.id,
        },
      }
    );

    res.status(201).json({
      status: "Success",
      newTransaction,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};
const createTransactionVoluntary = async (req, res, next) => {
  const { duesId } = req.params;
  const { totalPrice } = req.body;
  const file = req.file;
  let linkProofPayment;
  try {
    if (!duesId) {
      return next(new ApiError("Dues Id Tidak Ditemukan", 404));
    }
    const dues = await Dues.findByPk(duesId);

    if (file) {
      const filename = file.originalname;
      const extension = path.extname(filename);
      const uploadImage = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      });
      linkProofPayment = uploadImage.url;
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

    const newTransaction = await Transaction.create({
      userId: req.user.id,
      duesId: dues.id,
      totalPrice: totalPrice,
      linkProofPayment,
      date: formattedDate,
    });

    await UserDues.update(
      { duesStatus: true },
      {
        where: {
          duesId: dues.id,
        },
      }
    );

    // await sendSuccessMessageTransaction(req.user.phoneNumber);

    res.status(201).json({
      status: "Success",
      newTransaction,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findAllTransaction = async (req, res, next) => {
  try {
    const allTransaction = await Transaction.findAll({
      include: ["Dues", "User"],
    });
    allTransaction.sort((a, b) => {
      if (a.verified && !b.verified) return 1;
      if (!a.verified && b.verified) return -1;
      return new Date(b.date) - new Date(a.date); // Jika keduanya sama-sama diverifikasi, maka urutkan berdasarkan tanggal
    });
    const transactionCount = allTransaction.filter(
      (transaction) => transaction.verified === false
    ).length;
    res.status(200).json({
      status: "Success",
      allTransaction,
      transactionCount,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const updateVerify = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Transaction.update(
      {
        verified: true,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({
      status: "Success",
      message: "Berhasil Memverifikasi",
    });
  } catch (err) {
    next(new ApiError(err.message));
  }
};

module.exports = {
  createTransactionObligat,
  createTransactionVoluntary,
  findAllTransaction,
  updateVerify,
};
