const express = require("express");
const router = express.Router();
const {
  GetAllSchedules,
  GetSchedulesByTurfId,
  CreateSchedule,
  Update,
  Delete,
} = require("../controllers/schedule.controller");

router.get("/", GetAllSchedules);
router.get("/:id", GetSchedulesByTurfId);
router.post("/", CreateSchedule);
router.put("/:id", Update);
router.delete("/:id", Delete);

module.exports = router;
