const express = require("express");
const router = express.Router();
const {
  GetAll,
  GetById,
  CreateBooking,
  Update,
  Delete,
} = require("../controllers/bookings.controller");

router.get("/", GetAll);
router.get("/:id", GetById);
router.post("/", CreateBooking);
router.put("/:id", Update);
router.delete("/:id", Delete);

module.exports = router;
