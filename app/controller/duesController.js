const { Dues, User, UserDues } = require("../models");

const ApiError = require("../../utils/apiError");
const { Sequelize, where } = require("sequelize");

// const { sendMessageDues } = require("../../utils/sendMessage");

const createDuesObligat = async (next) => {
  const now = new Date();
  const currentYear = now.getFullYear();
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
  const currentMonthName = monthNames[now.getMonth()];

  const duesData = {
    duesName: `${currentMonthName} ${currentYear}`,
    duesType: "Wajib",
    price: 160000,
  };

  let createdDues;
  try {
    createdDues = await Dues.create(duesData);

    const users = await User.findAll({
      where: {
        role: "member",
      },
    });

    await Promise.all(
      users.map(async (user) => {
        await UserDues.create({
          userId: user.id,
          duesId: createdDues.id,
        });
      })
    );

    // const memberPhoneNumbers = users.map((user) => user.phoneNumber);
    // await Promise.all(
    //   memberPhoneNumbers.map(async (phoneNumber) => {
    //     await sendMessageDues(phoneNumber);
    //   })
    // );
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};
const createDuesVoluntary = async (req, res, next) => {
  const { duesName } = req.body;
  try {
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

    const newDues = await Dues.create({
      duesName,
      duesType: "Sukarela",
      price: 0,
      date: formattedDate,
    });
    res.status(201).json({
      status: "Success",
      newDues,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findDuesByType = async (req, res, next) => {
  try {
    const duesSukarela = await Dues.findAll({
      where: {
        duesType: "Sukarela",
      },
    });

    res.status(200).json({
      status: "Success",
      duesSukarela,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findAllDuesByMonth = async (req, res, next) => {
  try {
    const { month } = req.query;

    const monthInt = parseInt(month);
    if (isNaN(monthInt) || monthInt < 1 || monthInt > 12) {
      return next(new ApiError("Bulan yang disediakan tidak valid", 400));
    }

    const allDues = await Dues.findAll({
      where: Sequelize.where(
        Sequelize.fn("EXTRACT", Sequelize.literal('MONTH FROM "createdAt"')),
        parseInt(month)
      ),
    });

    if (allDues.length === 0) {
      return res.status(200).json({
        status: "Success",
        message: "Tidak ada data yang tersedia untuk bulan yang diberikan",
      });
    }

    res.status(200).json({
      status: "Success",
      allDues,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findAll = async (req, res, next) => {
  try {
    const allDues = await Dues.findAll();

    res.status(200).json({
      status: "Success",
      allDues,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  createDuesObligat,
  createDuesVoluntary,
  findDuesByType,
  findAllDuesByMonth,
  findAll,
};
