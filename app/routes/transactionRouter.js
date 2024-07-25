const router = require("express").Router();

const Transaction = require("../controller/transactionController");
const multer = require("../middlewares/upload");
const authMe = require("../middlewares/authentication");

router.post(
  "/obligat/:duesId/:userId",
  authMe,
  multer.single("linkProofPayment"),
  Transaction.createTransactionObligat
);
router.post(
  "/voluntary/:duesId",
  authMe,
  multer.single("linkProofPayment"),
  Transaction.createTransactionVoluntary
);
router.patch("/update-verify/:id", Transaction.updateVerify);
router.get("/", Transaction.findAllTransaction);

module.exports = router;
