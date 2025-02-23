const express = require("express");
const { uploadFile } = require("../controllers/file.controller");
const multer = require("multer");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("file"), uploadFile);

module.exports = router;
