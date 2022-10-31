import moment from "moment";
import React, { useEffect, useState } from "react";
// import DailyTableBody from "./DailyTableBody";
import { DailyTableHeader } from "./DailyTableHeader";

import MyDailySched from "./dailyTablebody/MyDailySched";
import OthersDailyScheds from "./dailyTablebody/OthersDailyScheds";
import ScheduleBar from "../../../Reusables/components/ScheduleBar";
import TableGrid from "./TableGrid";

const DailyCalendarTable = (props) => {
  const {
    selectedDay,
    setSelectedDay,
    myDaySchedules,
    coworkerDaySchedules,
    settingHrsObj,
    timezone,
  } = props;

  const [width, setWidth] = useState(window.innerWidth)
  // const userId = useContext(LoginContext).user?.id || 9;
  //resize event listener
useEffect(()=>{
  function handleResize(){
    setWidth(window.innerWidth);
  }
  window.addEventListener('resize', handleResize);
  return ()=>{
    window.removeEventListener('resize', handleResize);
  }
})

  const dayStart = selectedDay
    ?.clone()
    .set({
      h: settingHrsObj?.startTimeOfDay.hour(),
      m: settingHrsObj?.startTimeOfDay.minute(),
    });
  const dayEnd = dayStart?.clone().add(settingHrsObj?.scheduleHrs, "hours");
  // console.log("Daily: day start and end", selectedDay, dayStart, dayEnd, storeOpen, scheduleHrs)

  const displayTimes = () => {
    const timeArray = [];
    const iterTimes = settingHrsObj?.scheduleHrs + 2;
    
    //mobile view
    if (width <= 677) {
      
      for (let i = 0; i < iterTimes; i = i + 2) {
        timeArray.push(dayStart?.clone().add(i, "hours").format("hh"));
      }
      return timeArray.map((time, i) => {
        // if ((i + 1) % 2 === 1) {
          return <div className={`time num${(i + 1) % 2}`}>{time}</div>;
        // }
      });
    }else {
      for (let i = 0; i < iterTimes; i = i + 2) {
        timeArray.push(dayStart?.clone().add(i, "hours").format("ha"));
      }
      return timeArray.map((time, i) => (
        <div className={`time num${(i + 1) % 2}`}>{time}</div>
      ));
      
    }

    //   // console.log("timeArray", timeArray)
  };
  // console.log('time display', timeDisplay)

  const displaySched = (schedules, index) => {
    //most of case schedule is one. For some case, can be more than two
    return schedules?.map((sched, i) => {
      // console.log("schedule", sched);
      const schedFrom = moment(sched.starttime);
      const schedTo = moment(sched.endtime);

      if (schedTo > dayStart && schedFrom < dayEnd) {
        const newFrom = schedFrom > dayStart ? schedFrom : dayStart;
        const newTo = schedTo < dayEnd ? schedTo : dayEnd;
        // console.log('newdates', newFrom, newTo)
        return (
          <div
            key={`Dailyched ${schedules?.scheduleId} ${i}`}
            className={`Schedule ${index} ${i}`}
          >
            <ScheduleBar
              dayStart={dayStart}
              dayEnd={dayEnd}
              newFrom={newFrom}
              newTo={newTo}
              workcode={sched?.workcode}
              profIndex={index}
              schedIndex={i}
            />
          </div>
        );
      }
    });
  };

  return (
    <div className="Table-container">
      <DailyTableHeader
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <div className="Time-header-container">
        <div className="Time-header">{displayTimes()}</div>
      </div>
      <div className="Table-body-container">
        <TableGrid hrs={settingHrsObj?.scheduleHrs} />
        {myDaySchedules && (
          <MyDailySched
            mySched={myDaySchedules[0]}
            displaySched={displaySched}
          />
        )}

        {coworkerDaySchedules && (
          <OthersDailyScheds
            othersScheds={coworkerDaySchedules}
            displaySched={displaySched}
          />
        )}
      </div>
    </div>
  );
};

export default DailyCalendarTable;
