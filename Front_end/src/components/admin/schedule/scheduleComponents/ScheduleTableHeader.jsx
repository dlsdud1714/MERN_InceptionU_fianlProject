import React, { useContext } from "react";
import { StoreContext } from "../../../authentication/StoreProvider";
import DisplayDaysinWeek from "../../../Reusables/components/DisplayDaysinWeek";

const ScheduleTableHeader = (props) => {
  const { selectedDay, endDayOfWeek, daysInWeek } = props;
  const storeTimeZone =
    useContext(StoreContext).store?.store.timeZone || "America/New_York";
  // console.log("daysInweek", daysInWeek);
  return (
    <>
      <div className="period">
        {selectedDay?.format("MMM Do")} - {endDayOfWeek?.format("MMM Do")}
      </div>
        <div className="days">
            <div className="empty-div"></div>
          <DisplayDaysinWeek daysInWeek={daysInWeek} timezone={storeTimeZone} />
        </div>
    </>
  );
};

export default ScheduleTableHeader;
