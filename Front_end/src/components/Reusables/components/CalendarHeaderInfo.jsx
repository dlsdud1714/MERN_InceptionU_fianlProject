import React from "react";
import { VscCircleFilled } from "react-icons/vsc";

import "./style/calendarHeaderInfo.css"

const CalendarHeaderInfo = (props) => {
  const { startTimeOfDay, scheduleHrs } = props.settingHrsObj;
  const storeClose = startTimeOfDay?.clone().add(scheduleHrs, "hours");

  return (
    <div className="Table-info-header">
      <div className="Table-info">
        <div className="Store-hours">
          <p className="open">
            <span className="at">From</span>
            <span className="time"> {startTimeOfDay?.format("h:mm a (z)")}</span>
          </p>
          <p className="close">
            <span className="at">To</span>
            <span className="time"> {storeClose?.format("h:mm a (z)")}</span>
          </p>
        </div>

        <div className="Work-code">
          <div className="Working">
            <VscCircleFilled
              style={{ color: "#71C8C8", alignSelf: "center" }}
            />
            <span>Working</span>
          </div>
          <div className="Vacation">
            <VscCircleFilled
              style={{ color: "#5a5a5a", alignSelf: "center" }}
            />
            <span>Vacation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeaderInfo;
