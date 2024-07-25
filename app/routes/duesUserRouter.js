const router = require("express").Router();
const DuesUserController = require("../controller/duesUserController");
const authMe = require("../middlewares/authentication");

router.post("/obligat/:id", DuesUserController.createDuesObligate);
router.post("/voluntary/:id", DuesUserController.createDuesVoluntary);
router.get("/", DuesUserController.findAll);
router.get("/by-status", DuesUserController.findAllByStatus);
router.get("/by-user/:id", DuesUserController.findByUserId);
router.get(
  "/by-user-dues/:duesId",
  authMe,
  DuesUserController.findByUserIdDuesId
);
router.get("/by-true", DuesUserController.findByTrue);
router.get("/by-false", DuesUserController.findByFalse);

module.exports = router;
