const express = require("express");
const router = express.Router();
const {
  GetAllTurfs,
  GetById,
  CreateTurf,
  CompleteTurfOnboarding,
  Delete,
} = require("../controllers/turf.controller");

router.get("/", GetAllTurfs);
router.get("/:id", GetById);
router.post("/", CreateTurf);
router.put("/:id", CompleteTurfOnboarding);
router.delete("/:id", Delete);

module.exports = router;
