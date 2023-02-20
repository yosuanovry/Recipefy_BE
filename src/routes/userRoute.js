const express = require("express");
const router = express.Router();
const { getData, getDetail, postData, putData, deleteData } = require("../controller/userController");
// const errorHandler = require("../middleware/errorHandling");

router.get("/", getData);
router.get("/:id", getDetail);
router.post("/", postData);
router.put("/:id", putData);
router.delete("/:id", deleteData);


module.exports = router;
