const { default: mongoose } = require("mongoose");
const turfSchema = require("../schemas/turf.schema");

const Turf = new mongoose.model("turf", turfSchema);

module.exports = Turf;
