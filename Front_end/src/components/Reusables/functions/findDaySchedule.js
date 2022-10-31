import moment from "moment";

const findDaySchedule = (daysInWeek, schedules, timezone, settingHrsObj) => {
  // setTodayWorkSched();
  const daySchedArray = [];
  daysInWeek?.map((day) => {
    // const today = moment().format("YYYY-MM-DD");
    const oneDay = moment.tz(day, timezone);
    const dayStart = oneDay.clone().set({
      h: settingHrsObj?.startTimeOfDay?.hour(),
      m: settingHrsObj?.startTimeOfDay?.minute(),
    });
    const dayEnd = dayStart.clone().add(settingHrsObj?.scheduleHrs, "hours");

    const foundSched = schedules?.find(
      (sched) =>
        moment.tz(sched.endtime, timezone) > dayStart &&
        moment.tz(sched.starttime, timezone) < dayEnd
    );
    if (foundSched) {
      const schedFrom = moment.tz(foundSched.starttime, timezone);
      // console.log("found", foundSched.starttime, schedFrom)
      const schedTo = moment.tz(foundSched.endtime, timezone);
      const newFrom = schedFrom > dayStart ? schedFrom : dayStart;
      const newTo = schedTo < dayEnd ? schedTo : dayEnd;
      // console.log("foundSched", schedFrom, schedTo, dayStart, dayEnd);
      const hrs =
        Math.round((moment(newTo - newFrom).unix() / 60 / 60) * 100) / 100;

      return daySchedArray.push({
        idSchedule: foundSched.idSchedule,
        day: oneDay,
        schedule: true,
        workcode: foundSched.workcode,
        swapRequested: foundSched.requestedSwap,
        swapApproved: foundSched.approved,
        dayStart,
        dayEnd,
        originalStart: schedFrom,
        originalEnd: schedTo,
        newFrom,
        newTo,
        hrs,
      });
    } else {
      return daySchedArray.push({
        day: oneDay,
        schedule: false,
      });
    }
  });
  // console.log("work array", daySchedArray);
  return daySchedArray;
};
export default findDaySchedule;
