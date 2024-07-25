const router = require("express").Router();

// const swaggerUI = require("swagger-ui-express");
// const swaggerDocument = require("../../docs/swagger.json");
const Auth = require("./authRouter");
const User = require("./userRouter");
const Umkm = require("./umkmRouter");
const Latter = require("./latterRouter");
const Dues = require("./duesRouter");
const DuesUser = require("./duesUserRouter");
const Transaction = require("./transactionRouter");

// router.use("/api-docs", swaggerUI.serve);
// router.use("/api-docs", swaggerUI.setup(swaggerDocument));
router.use("/api/v1/auth", Auth);
router.use("/api/v1/user", User);
router.use("/api/v1/umkm", Umkm);
router.use("/api/v1/latter", Latter);
router.use("/api/v1/dues", Dues);
router.use("/api/v1/duesuser", DuesUser);
router.use("/api/v1/transaction", Transaction);

module.exports = router;
