import moment from "moment";
import React from "react";

const DisplayHolidays = (props) => {
  const {
    holidaysOfMonth,
    day,
    } = props;

  return (
    <div>
      {holidaysOfMonth?.map((holiday, index) => {
        const data = moment(holiday.date, "YYYY-MM-DD").date();
        //const data = holiday[0]
        //console.log("data",moment(holiday.date,("YYYY-MM-DD")))
        if (data === day.value) {
          //console.log("final destination", holiday.name )
          return (
            <div className="holidays" key={index}>
              {holiday.name}{" "}
            </div>
          );
        }
        //console.log("data", data)
      })}
    </div>
  );
};

export default DisplayHolidays;
