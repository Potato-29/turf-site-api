const mongoose = require("mongoose");
const ScheduleSchema = require("../schemas/schedule.schema");

const Schedule = new mongoose.model("schedule", ScheduleSchema);

module.exports = Schedule;
