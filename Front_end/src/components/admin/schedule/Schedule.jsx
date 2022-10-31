import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../authentication/StoreProvider";
import CalendarHeaderInfo from "../../Reusables/components/CalendarHeaderInfo";
import ClickableSchedules from "./scheduleComponents/ClickableSchedules";

import ScheduleTableHeader from "./scheduleComponents/ScheduleTableHeader";

import "./schedule.css";

const Schedule = (props) => {
  const {
    selectedDay,
    schedules,
    filters,
    setSchedModalOpen,
    selectedDate,
    setSelectedDate,
    selectedSched,
    setSelectedSched,
    settingHrsObj
  } = props;
  const storeTimeZone =
    useContext(StoreContext).store?.store.timeZone || "America/New_York";
  const endDayOfWeek = selectedDay?.clone().endOf("week");

  const [daysInWeek, setDaysInWeek] = useState();

  useEffect(() => {
    const weekArray = [];
    for (let i = 0; i < endDayOfWeek?.diff(selectedDay, "days") + 1; i++) {
      weekArray.push(selectedDay?.clone().add(i, "days").format());
    }
    return setDaysInWeek(weekArray);
  }, [selectedDay]);

  return (
    <div className="Scheduling">
      <CalendarHeaderInfo
      settingHrsObj={settingHrsObj}
       />
      <div className="Admin-weekly-calendar">
        <div className="Weekly-header">
          <ScheduleTableHeader
            selectedDay={selectedDay}
            endDayOfWeek={endDayOfWeek}
            daysInWeek={daysInWeek}
          />
        </div>
        <div className="Schedules">
          {schedules && (
            <ClickableSchedules
              schedules={schedules}
              daysInWeek={daysInWeek}
              settingHrsObj={settingHrsObj}
              timezone={storeTimeZone}
              filters={filters}
              setSchedModalOpen={setSchedModalOpen}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedSched={selectedSched}
              setSelectedSched={setSelectedSched}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
