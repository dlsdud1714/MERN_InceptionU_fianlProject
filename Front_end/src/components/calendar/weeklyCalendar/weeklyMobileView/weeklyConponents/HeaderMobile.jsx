import moment from "moment";
import React from "react";
import { IconContext } from "react-icons";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
// import WeeklyTableHeader from "../../weeklyWebView/weeklyComponents/WeeklyTableHeader";

const HeaderMobile = ({
  selectedDay,
  setSelectedDay,
  daysInWeek,
  timezone,
}) => {
  const selectDayInHeader = selectedDay?.format("MMM YYYY");

  const moveToPreWeek = () => {
    setSelectedDay((pre) => pre?.clone().subtract(7, "days"));
  };

  const moveToNextWeek = () => {
    setSelectedDay((pre) => pre?.clone().add(7, "days"));
  };
  const getPeriod = () => {
    const lastDay = daysInWeek?.length - 1;
    // console.log('last', daysInWeek[0],moment(daysInWeek[0]).tz(timeZone))
    const from = moment(daysInWeek[0]).tz(timezone).format("ddd, Do");
    const to = moment(daysInWeek[lastDay]).tz(timezone).format("ddd, Do");

    return (
      <div className="period">
        <div className="from">{from}</div> &nbsp; ~ &nbsp;<div className="to">{to}</div>
      </div>
    );
  };

  return (
    <>
      <div className="WeeklyCal-header">
        <IconContext.Provider value={{ className: "buttons" }}>
          <MdOutlineArrowBackIos onClick={moveToPreWeek} />
          <div className="period-container">
            {daysInWeek && getPeriod()}
            <div className="DayInHeader">{selectDayInHeader}</div>
          </div>
          <MdOutlineArrowForwardIos onClick={moveToNextWeek} />
        </IconContext.Provider>
      </div>
    </>
  );
};

export default HeaderMobile;
