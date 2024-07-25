const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Auth } = require("../models");

const ApiError = require("../../utils/apiError");
// const {
//   sendSuccessMessageForgotePassword,
// } = require("../../utils/sendMessage");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await Auth.findOne({
      where: {
        email,
      },
      include: ["User"],
    });

    if (!user) {
      return next(new ApiError("Email anda tidak ditemukan"));
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.userId,
          username: user.User.name,
          email: user.email,
        },
        process.env.JWT_SECRET
      );
      res.status(200).json({
        status: "Success",
        message: "Anda berhasil login",
        data: {
          token,
          id: user.userId,
          name: user.User.name,
          email: user.email,
          role: user.User.role,
        },
      });
    } else {
      return next(new ApiError("Kata sandi yang anda masukkan salah", 401));
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const authenticate = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "Success",
      data: {
        id: req.user.id,
        nik: req.user.nik,
        name: req.user.name,
        email: req.user.Auth.email,
        phoneNumber: req.user.phoneNumber,
        address: req.user.address,
        noHome: req.user.noHome,
        placeDateBday: req.user.placeDateBday,
        gender: req.user.gender,
        blockHome: req.user.blockHome,
        role: req.user.role,
        image: req.user.image,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const updateNewPassword = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        status: "Error",
        message: "Harap masukkan lengkapi kolom yang belum terisi",
      });
    }

    const user = await Auth.findOne({
      where: {
        userId,
      },
      include: ["User"],
    });

    if (!user) {
      return res.status(404).json({
        status: "Error",
        message: "Pengguna tidak ditemukan",
      });
    }

    const passwordLength = newPassword.length < 8;
    if (passwordLength) {
      return next(
        new ApiError("Panjang kata sandi minimal harus 8 karakter", 400)
      );
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      return res.status(400).json({
        status: "Error",
        message: "Password lama anda tidak valid",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        status: "Error",
        message: "Password atau confirm password tidak sesuai",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    await Auth.update(
      {
        password: hashedPassword,
      },
      {
        where: {
          userId,
        },
      }
    );

    res.status(200).json({
      status: "Success",
      message: "Kata sandi anda telah berhasil diperbaharui",
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.query;
    const { password, confirmPassword } = req.body;

    const users = await Auth.findOne({
      where: {
        email,
      },
      include: ["User"],
    });

    const passwordLength = password.length < 8;
    if (passwordLength) {
      return next(
        new ApiError("Panjang kata sandi minimal harus 8 karakter", 400)
      );
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "Error",
        message: "Password atau confirm password tidak sesuai",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await Auth.update(
      {
        password: hashedPassword,
      },
      {
        where: {
          email,
        },
      }
    );

    // await sendSuccessMessageForgotePassword(users.User.phoneNumber);

    res.status(200).json({
      status: "Success",
      message: "Kata sandi anda telah berhasil diperbaharui",
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const cekEmail = async (req, res, next) => {
  try {
    const { email } = req.query;

    const users = await Auth.findOne({
      where: {
        email,
      },
    });

    if (!users) {
      return next(new ApiError("Email tidak ditemukan", 404));
    }

    res.status(200).json({
      status: "Success",
      users,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  login,
  authenticate,
  updateNewPassword,
  forgotPassword,
  cekEmail,
};
