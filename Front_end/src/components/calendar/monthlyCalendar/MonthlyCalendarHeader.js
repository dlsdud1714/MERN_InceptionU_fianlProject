import { useEffect } from "react";
import { IconContext } from "react-icons";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

const MonthlyCalendarHeader = (props) => {
  const {
    today,
    setToday,
    weekdayHeaders,
    daysInMonth,
    setDate,
  } = props;

  //console.log("today is",today)
  useEffect(() => {
    setDate(new Date(today));
  }, [today]);

  let getNextMonth = () => {
    setToday((next) => next?.clone().add(1, "month"));
  };

  let getPreMonth = () => {
    setToday((pre) => pre?.clone().subtract(1, "month"));
  };

  return (
    <div>
      <div className="headerDisplay">
        <IconContext.Provider value={{ className: "buttons" }}>
          <MdOutlineArrowBackIos onClick={getPreMonth} />
          <div className="MonthInHeader">{today?.format("MMM YYYY")}</div>
          <MdOutlineArrowForwardIos onClick={getNextMonth} />
        </IconContext.Provider>
      </div>

      {daysInMonth?.map((day, index) => {
        console.log("day in daysInMonth ", day);
      })}
      <div className="headerGrid">
        {weekdayHeaders.map((day, index) => {
          return <div key={index}>{day}</div>;
        })}
      </div>
    </div>
  );
};

export default MonthlyCalendarHeader;
