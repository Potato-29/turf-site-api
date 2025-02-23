const responseHelper = require("../helpers/http-responses");
const { eachDayOfInterval, format, addMinutes } = require("date-fns");
const {
  insertManySchedules,
  getAllSchedules,
} = require("../services/schedule.service");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  GetAllSchedules: async (req, res, next) => {
    try {
      const schedules = await getAllSchedules();
      responseHelper.success(res, "Success", schedules);
    } catch (error) {
      next(error);
    }
  },

  GetSchedulesByTurfId: async (req, res, next) => {
    try {
      const id = req.params.id;
      const schedules = await getAllSchedules({
        turf_id: id,
        date: { $gte: new Date() },
      });
      responseHelper.success(res, "Success", schedules);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  CreateSchedule: async (req, res, next) => {
    try {
      const {
        operatingHours,
        slotDuration,
        enabledDays,
        dateRange,
        blockedDates,
        turf_id,
      } = req.body;

      function generateTimeSlots(operatingHours, slotDuration, date) {
        const { start, end } = operatingHours;
        let slots = [];

        let currentTime = new Date(`${date}T${start}:00`); // Using a fixed date
        const endTime = new Date(`${date}T${end}:00`);

        while (currentTime < endTime) {
          let start_time = format(currentTime, "h:mm a");
          let end_time = format(
            addMinutes(currentTime, slotDuration),
            "h:mm a"
          );
          let slotObj = {
            slot: `${start_time} - ${end_time}`,
            start_time,
            end_time,
            is_booked: false,
          };
          slots.push(slotObj);
          currentTime = addMinutes(currentTime, slotDuration);
        }

        return slots;
      }

      const createScheduleArray = (range) => {
        let scheduleArr = [];
        const { from, to } = range;
        eachDayOfInterval({
          start: new Date(from),
          end: new Date(to),
        }).map((date) => {
          let day = format(date, "EEEE");
          day = day.toLowerCase();

          if (enabledDays[day]) {
            let schedule = {
              date: format(date, "yyyy-MM-dd"),
              day,
              slotDuration,
              operatingHours,
              turf_id,
              slots: generateTimeSlots(
                operatingHours,
                slotDuration,
                format(date, "yyyy-MM-dd")
              ),
            };
            scheduleArr.push(schedule);
          }
        });
        return scheduleArr;
      };

      const schedulesArr = createScheduleArray(dateRange);

      const data = await insertManySchedules(schedulesArr);
      if (data) {
        responseHelper.created(res, "Created successfully", data);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  Update: async (req, res, next) => {
    try {
      const id = req.params.id;
      responseHelper.success(res, "Updated successfully", null);
    } catch (error) {
      next(error);
    }
  },

  Delete: async (req, res, next) => {
    try {
      const id = req.params.id;
      responseHelper.success(res, "Deleted successfully", null);
    } catch (error) {
      next(error);
    }
  },
};
