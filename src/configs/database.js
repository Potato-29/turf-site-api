const mongoose = require("mongoose");

let gridFSBucket;
async function connectDB() {
  let testMode = process.env.TEST_MODE === "true";
  const db = await mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: "turf-site",
    })
    .then(() => {
      console.log("Db Connected!", `mode: ${testMode ? "test" : "normal"}`);
    })
    .catch((err) => {
      console.error("Failed to connect db!", err);
    });
}

module.exports = connectDB;
