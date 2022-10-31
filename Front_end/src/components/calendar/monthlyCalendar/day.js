import React, {  useState } from "react";
import moment from "moment";
//import MonthlyCalendarHeader from "./monthlyCalendarHeader";

const Day = () => {
  const [today, setToday] = useState(moment());
  const [daysInMonth, setDaysInMonth] = useState();

  const className = `day ${today.value === "padding" ? "padding" : ""} ${
    today.isCurrentDay ? "currentDay" : ""
  }`;
  const borderColor = function (value) {
    if (value !== "padding") {
      return " 1px solid lightGrey";
    } else return " 1px solid white";
  };

   
  return(
    <div></div>
  )};

export default Day;
