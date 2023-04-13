const express = require("express");
const router = express.Router();
const { getData, getDetailId, postData, putData, deleteData, getDataByEmail } = require("../controller/userController");
const {protect} = require('../middleware/auth')
const upload = require('../middleware/uploadPhoto')
const validateFile = require('../middleware/validatePhoto')
// const errorHandler = require("../middleware/errorHandling");

router.get("/", getData);
router.get("/my-profile", protect, getDetailId);
router.get("/:id", getDataByEmail);
router.put("/update-profile", protect, upload.single('photo'), validateFile, putData);
// router.delete("/:id", deleteData);
// router.post("/", postData);


module.exports = router;
