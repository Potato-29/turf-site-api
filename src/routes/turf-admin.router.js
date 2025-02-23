const express = require("express");
const router = express.Router();
const {
  GetAll,
  GetById,
  RegisterTurfAdmin,
  LoginTurfAdmin,
  Update,
  Delete,
} = require("../controllers/turf-admin.controller");

router.get("/", GetAll);
router.get("/:id", GetById);
router.post("/login", LoginTurfAdmin);
router.post("/", RegisterTurfAdmin);
router.put("/:id", Update);
router.delete("/:id", Delete);

module.exports = router;
