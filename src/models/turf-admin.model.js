const mongoose = require("mongoose");
const TurfAdminSchema = require("../schemas/turf-admin.schema");

const TurfAdmin = new mongoose.model("turf-admin", TurfAdminSchema);

module.exports = TurfAdmin;
