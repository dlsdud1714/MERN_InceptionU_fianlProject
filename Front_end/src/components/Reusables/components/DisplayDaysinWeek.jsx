import React from "react";
import moment from "moment";
import './style/displayDaysinWeek.css'

const DisplayDaysinWeek = ({daysInWeek, timezone}) => {
  
    return daysInWeek?.map((day, index) => {
      const timeinTz = moment.tz(day,timezone);
      const nowinTz = moment.tz(moment(),timezone);
        // console.log('days', day, timezone);
        const isWeekend =
        timeinTz.day() === 0 || timeinTz.day() === 6 ? "Weekend" : "";
        const isToday = day === nowinTz.startOf("day").format() ? "Today" : "";

        return (
          <div
            className={`WeeklyCal-date ${isToday} ${isWeekend}`}
            key={`daysInWeek ${index}`}
          >
            {timeinTz.format("ddd DD")}
          </div>
        );
      })
}

export default DisplayDaysinWeek