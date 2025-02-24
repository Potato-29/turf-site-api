const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./src/middlewares/errorHandler");
const connectDB = require("./src/configs/database");
dotenv.config();

//Import all API routes
const turfRouter = require("./src/routes/turf.router");
const adminRouter = require("./src/routes/admin.router");
const scheduleRouter = require("./src/routes/schedule.router");
const turfAdminRouter = require("./src/routes/turf-admin.router");
const bookingsRouter = require("./src/routes/bookings.router");

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

app.use("/api/turf", turfRouter);
app.use("/api/admin", adminRouter);
app.use("/api/schedule", scheduleRouter);
app.use("/api/turf-admin", turfAdminRouter);
app.use("/api/bookings", bookingsRouter);

app.use(errorHandler);

connectDB();
app.get("/", (req, res) => {
  res.json({ msg: "Hello World!" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
