const express = require("express");
const router = express.Router();
const {
  CreateBooking,
  Update,
  Delete,
  GetUserBookings,
} = require("../controllers/bookings.controller");

// router.get("/", GetAll);
// router.get("/:id", GetById);
router.get("/user/:id", GetUserBookings);
router.post("/", CreateBooking);
router.put("/:id", Update);
router.delete("/:id", Delete);

module.exports = router;
