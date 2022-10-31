import React from "react";
import { IconContext } from "react-icons";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";


const WeeklyTableHeader = (props) => {

  const { selectedDay, setSelectedDay } = props;
  const selectDayInHeader = selectedDay?.format("MMM YYYY");
  // const userTimeZone = moment.tz.guess();

  const moveToPreWeek = () => {
    setSelectedDay((pre) => pre?.clone().subtract(7, "days"));
    // console.log("Selected day", selectedDay);
  };
  const moveToNextWeek = () => {
    setSelectedDay((pre) => pre?.clone().add(7, "days"));
  };

  return (
    <>
      <div className="WeeklyCal-header">
        <IconContext.Provider value={{className: "buttons" }}>
          <MdOutlineArrowBackIos onClick={moveToPreWeek} />
          <div className="DayInHeader">{selectDayInHeader}</div>
          <MdOutlineArrowForwardIos onClick={moveToNextWeek} />
        </IconContext.Provider>
      </div>

      
   </>
  );
};

export default WeeklyTableHeader;
