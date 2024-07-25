const router = require("express").Router();
const Umkm = require("../controller/umkmController");
const checkRole = require("../middlewares/checkRole");
const authMe = require("../middlewares/authentication");
const multer = require("../middlewares/upload");

router.post("/create", multer.single("imageUrl"), Umkm.createUmkm);

router.get("/", Umkm.getAllUmkm);

router.get("/get/:id?", Umkm.getOnceUmkm);

router.patch("/update/:id", multer.single("imageUrl"), Umkm.updateUmkm);

router.delete("/delete/:id", Umkm.deleteUmkm);

module.exports = router;
