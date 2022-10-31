import React, { useEffect, useState } from "react";
import ScheduleBar from "../../../../../Reusables/components/ScheduleBar";
import findDaySchedule from '../../../../../Reusables/functions/findDaySchedule'

const WeeklySchedBar = ({ daysInWeek, settingHrsObj, schedules, timezone,swapReqScheds }) => {
  const [eachDayScheds, setEachDayScheds] = useState();
 
  //set schedule data array to be displayed
  useEffect(() => {
    const weekSchedArray = findDaySchedule(daysInWeek, schedules, timezone, settingHrsObj);
    // console.log("weekSched", weekSchedArray);
    setEachDayScheds(weekSchedArray);
  }, [daysInWeek, settingHrsObj, schedules, timezone]);

  return eachDayScheds?.map((sched, i) => {
    // console.log("mapped sched", sched);
    if (!sched.schedule) {
      return (
        <div
          className="Schedule"
          key={`emptySched ${sched?.scheduleId} ${i}`}
        ></div>
      );
    } else if (sched.schedule) {
      // console.log("returns schedule", sched)
      return (
        <div key={`Sched ${sched?.scheduleId} ${i}`} className="Schedule">
          {sched.swapRequested&&<div className="block"><p className="block-text">Swap Requested</p></div>}
          {/* {sched.swapRequested&&sched.swapApproved&&<div className="block"><p className="block-text">Swap Approved</p></div>} */}
          <ScheduleBar
            dayStart={sched.dayStart}
            dayEnd={sched.dayEnd}
            newFrom={sched.newFrom}
            newTo={sched.newTo}
            workcode={sched.workcode}
            timezone={timezone}
          />
          {sched.workcode === 0 && (
            <div className="text">
              {sched.newFrom?.format("h:mma")}-{sched.newTo?.format("h:mma")}
            </div>
          )}
        </div>
      );
    }
  });
};

export default WeeklySchedBar;
