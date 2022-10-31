import React, { useContext, useEffect, useState } from "react";
import { Container } from "@mui/system";
import MonthlyCalendarHeader from "./MonthlyCalendarHeader";
import AddEvent from "./AddEvent";
import "./monthlyCalendar.css";
import { LoginContext } from "../../authentication/LoginProvider";
import { StoreContext } from "../../authentication/StoreProvider";
import DisplayHolidays from "./DisplayHolidays";
import MonthlySchedBar from "./MonthlySchedBar";
import moment from "moment";

const weekdayHeaders = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MonthlyCalendar = (props) => {
  const userId = useContext(LoginContext).user?.id || 9;
  const storeId = useContext(StoreContext).store?.Store_idStore || 1;
  const { today, setToday, open } = props;

  // console.log("positions",positions)

  const [theDate, setDate] = useState(new Date());
  const month = theDate.getMonth();
  const year = theDate.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  //const firstDayOfMonth = new Date(year, month, 1);
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(
    new Date(year, month, 1)
  );
  const [monthsArray, setMonthsArray] = useState();
  const [addEvent, setAddEvent] = useState(false);
  const [myMonSched, setMonSched] = useState();
  const [holidaysOfMonth, setholidaysOfMonth] = useState();
  const [startOfMonth, setStartOfMonth] = useState();
  const [vacMonSched, setVacMonSched] = useState();
  //const startOfMonth = today?.clone().startOf("month");
  const endOfMonth = today?.clone().endOf("month");
  //console.log("month", month)

  useEffect(() => {
    const start = today?.clone().startOf("month");
    setFirstDayOfMonth(new Date(year, month, 1));
    setStartOfMonth(start);
  }, [today, month, year]);
  //console.log("startOfMonth", startOfMonth);

  useEffect(() => {
    const getAllSchedules = async () => {
      try {
        const monthStart = startOfMonth.clone().format("YYYY-MM-DD");
        //console.log("today, startOfMonth", today, startOfMonth);
        const res = await fetch(
          `/api/schedule/monthly?storeId=${storeId}&userId=${userId}&startOfMonth=${monthStart}`
        );
        const scheduleData = await res.json();
        console.log("fetched data", scheduleData);
        setMonSched(() => scheduleData.mySchedules[0].schedules.workScheds);
        setVacMonSched(() => scheduleData.mySchedules[0].schedules.vacScheds);
      } catch (err) {
        console.log("failed to fetch schedule data", err);
        setMonSched(() => null);
      }
    };
    startOfMonth && getAllSchedules();
  }, [today, storeId, startOfMonth, userId]);
  console.log("stored data", myMonSched, vacMonSched);

  useEffect(() => {
    const getMonHolidays = async () => {
      const startOfMonth = today?.clone().startOf("months");
      const endOfMonth = today?.clone().endOf("months");
      const startOfHoliday = startOfMonth.clone().format("YYYY-MM-DD");
      const endOfHoliday = endOfMonth.clone().format("YYYY-MM-DD");

      const res = await fetch(
        `/api/events?startOfHoliday=${startOfHoliday}&endOfHoliday=${endOfHoliday}`
      );
      const holidaysData = await res.json();
      //console.log("holidaysData", holidaysData);
      const newHoliday = [];
      holidaysData?.holidayData.map((holiday) => {
        const newdate = moment
          .tz(holiday.event_date, "UTC")
          .format("YYYY-MM-DD");
        newHoliday.push({ date: newdate, name: holiday.nameEn });
        //console.log("holiday", newdate)
      });

      setholidaysOfMonth(newHoliday);
    };
    console.log("newHoliday", holidaysOfMonth);
    startOfMonth && getMonHolidays();
  }, [today, startOfMonth, open]);

  useEffect(() => {
    const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    const paddingDays = weekdayHeaders.indexOf(dateString.split(", ")[0]);
    // console.log("paddingDays", paddingDays)
    const endPaddingDays = 7 - ((paddingDays + daysInMonth) % 7);
    let monthArray = [];
    //console.log("days in month", daysInMonth);
    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const dayString = `${month + 1}/${i - paddingDays}/${year}`;
      if (i > paddingDays) {
        monthArray.push({
          value: i - paddingDays,
          isCurrentDay: i - paddingDays === today,
          date: dayString,
        });
      } else {
        monthArray.push({
          value: "",
          isCurrentDay: false,
          date: "",
        });
      }
    }

    for (let i = 0; i < endPaddingDays; i++) {
      monthArray.push({
        value: "",
        isCurrentDay: false,
        date: "",
      });
    }

    setMonthsArray(monthArray);
  }, [today, firstDayOfMonth, daysInMonth, month, year]);

  // daysInMonth,month,weekdayHeaders,year
  return (
    <div>
      <div>
        <Container sx={{ alignContent: "center" }}>
          <br />
          <MonthlyCalendarHeader
            weekdayHeaders={weekdayHeaders}
            setDate={setDate}
            today={today}
            setToday={setToday}
          />

          <div className="mainGridStyle">
            {monthsArray?.map((day, index) => {
              return (
                <div className="eventDiv" key={`day ${index}`}>
                  <div className="eventDivDiv">
                    <AddEvent
                      addEvent={addEvent}
                      today={today}
                      setAddEvent={setAddEvent}
                      holidaysOfMonth={holidaysOfMonth}
                      setholidaysOfMonth={setholidaysOfMonth}
                      day={day}
                    />
                  </div>
                  <div className="Empty-div"></div>

                  <div className="text">{day.value}</div>

                  <MonthlySchedBar
                    startOfMonth={startOfMonth}
                    storeId={storeId}
                    userId={userId}
                    setMonSched={setMonSched}
                    myMonSched={myMonSched}
                    today={today}
                    day={day}
                    vacMonSched={vacMonSched}
                    setVacMonSched={setVacMonSched}
                  />
                  <DisplayHolidays
                    today={today}
                    holidaysOfMonth={holidaysOfMonth}
                    setholidaysOfMonth={setholidaysOfMonth}
                    startOfMonth={startOfMonth}
                    day={day}
                  />
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default MonthlyCalendar;
