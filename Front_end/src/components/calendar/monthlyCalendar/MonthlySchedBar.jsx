import moment from "moment";
import React from "react";

const MonthlySchedBar = (props) => {
  const { myMonSched, day, vacMonSched, setVacMonSched } = props;
  //console.log("vacMonShed", vacMonSched)
  return (
    <div className="monthlyShedule">
      {myMonSched?.map((schedule, index) => {
        const starttime = moment(schedule.starttime).format("h:mm a");
        const endtime = moment(schedule.endtime).format("h:mm a");
        //const startVac
        const scheduleDate = moment(schedule.starttime).date();

        //console.log("vacation", vacMonSched)
        //console.log("scheduleDate,schedule.starttime  ", scheduleDate)
        if (scheduleDate === day.value) {
          return (
            <div key={index}>
              {starttime} - {endtime}
            </div>
          );
        }
        //console.log("day value", day.value);
      })}
      <div className="vacation">
        {vacMonSched?.map((vacation, index) => {
          const vacDate = moment(vacation.starttime).startOf("day")
          const vacEndDate = moment(vacation.endtime).endOf("day")
          //console.log(" day. date", day.date)
          const momentDay = moment(day.date,"MM/DD/YYYY")
          //console.log("momentDay", momentDay)

          //console.log(" vacDate and day.value and vacEndDate",vacDate, day.value, vacEndDate )
          if (momentDay >= vacDate && momentDay <= vacEndDate) {
            return <div key={index}>On vacation</div>;
          }
          
          //console.log("vacation", vacDate);
        })}
      </div>
    </div>
  );
};

export default MonthlySchedBar;
