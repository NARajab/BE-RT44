const ApiError = require("../../utils/apiError");

const checkRole = (allowedRoles) => async (req, res, next) => {
  try {
    const userRole = req.user.role;
    if (!allowedRoles.includes(userRole)) {
      throw new ApiError(
        `Anda bukan ${allowedRoles.join(
          " atau "
        )} sehingga Anda tidak memiliki akses.`,
        401
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkRole;
