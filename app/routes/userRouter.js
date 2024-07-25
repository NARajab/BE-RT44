const router = require("express").Router();

const User = require("../controller/userController");
const authMe = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");
const multer = require("../middlewares/upload");

const allowedRoles = ["sekretaris", "superAdmin"];

router.get("/", User.getAllUsers);
router.get("/get/:id?", User.getOneUser);
router.post("/create", User.createUser);
router.patch("/update/:id", multer.single("image"), User.updateUser);
router.delete("/delete/:id", User.deleteUser);

module.exports = router;
