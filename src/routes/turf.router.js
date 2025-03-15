const express = require("express");
const router = express.Router();
const {
  GetAllTurfs,
  GetById,
  CreateTurf,
  CompleteTurfOnboarding,
  GetAllTurfsByFilter,
  Delete,
  GetSchedulesByTurfId,
} = require("../controllers/turf.controller");

router.get("/", GetAllTurfs);
router.get("/filter", GetAllTurfsByFilter);
router.get("/:id", GetById);

router.get("/:id/schedules", GetSchedulesByTurfId);

router.post("/", CreateTurf);
router.put("/:id", CompleteTurfOnboarding);
router.delete("/:id", Delete);

module.exports = router;
