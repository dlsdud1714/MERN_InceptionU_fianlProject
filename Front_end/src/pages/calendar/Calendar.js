import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import moment from "moment";
import "moment-timezone";

import { StoreContext } from "../../components/authentication/StoreProvider";
import MonthlyCalendar from "../../components/calendar/monthlyCalendar/MonthlyCalendar";
import WeeklyCalendarWeb from "../../components/calendar/weeklyCalendar/weeklyWebView/WeeklyCalendarWeb";
import WeeklyCalendarMobile from "../../components/calendar/weeklyCalendar/weeklyMobileView/WeeklyCalendarMobile";
import DailyCalendar from "../../components/calendar/dailyCalendar/DailyCalendar";
import SwapShiftRequest from "../../components/shiftSwapRequest/SwapShiftRequest";
import WeeklyFilters from "../../components/calendar/weeklyCalendar/weeklyWebView/WeeklyFilters";

import ViewButtons from "../../components/Reusables/components/ViewButtons";
import TodayButton from "../../components/Reusables/components/TodayButton";
import RequestSwapBtn from "../../components/Reusables/components/RequestSwapBtn";
import CalendarHeaderInfo from "../../components/Reusables/components/CalendarHeaderInfo";

import "./calendar.css";

const Calendar = () => {
  const [filter, setFilter] = useState("All");
  const filterList = ["All", "My Position", "Working"];
  // console.log("filter in calendar", filter)
  const [selectedDay, setSelectedDay] = useState(moment());
  const [openModal, setOpenModal] = useState(false);

  const calendar = useLocation()?.pathname.split("/").pop();
  const navigate = useNavigate();
  // console.log("calendar", calendar);
  const storeTimeZone =
    useContext(StoreContext).store?.store.timeZone;
  const userTimeZone = moment.tz.guess();
  //  console.log(userTimeZone)
  const [settingHrsObj, setSettingHrsObj] = useState({
    startTimeOfDay: moment.tz("06:00", "HH:mm", storeTimeZone).tz(userTimeZone),
    scheduleHrs: 18,
  });

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const webViewCals = () => {
    return (
      <div className="Calendars-container">
        <div className="Calendar-header">
          <div className="Calendar-buttons">
            <RequestSwapBtn setOpenModal={setOpenModal} />
            <ViewButtons />
            <TodayButton setSelectedDay={setSelectedDay} />
          </div>
          {calendar === "weekly" && (
            <WeeklyFilters
              filter={filter}
              setFilter={setFilter}
              filterList={filterList}
            />
          )}
        </div>
        <div className="Calendar-view">
          <Routes>
            <Route
              path="/monthly"
              element={
                <MonthlyCalendar
                  today={selectedDay}
                  setToday={setSelectedDay}
                  scheduleHrs={settingHrsObj.scheduleHrs}
                  timezone={userTimeZone}
                />
              }
            />
            <Route
              path="/weekly"
              element={
                <WeeklyCalendarWeb
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                  settingHrsObj={settingHrsObj}
                  filter={filter}
                  timeZone={userTimeZone}
                  openModal={openModal}
                />
              }
            />

            <Route
              path="/daily"
              element={
                <DailyCalendar
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                  settingHrsObj={settingHrsObj}
                  timeZone={userTimeZone}
                  openModal={openModal}
                />
              }
            />
          </Routes>
        </div>
      </div>
    );
  };

  const mobileViewCals = () => {
    return (
      <div className="Calendars-container">
        {calendar === "daily" && (
          <BiArrowBack
            style={{ color: "var(--wink-color)" }}
            onClick={() => navigate("/calendar/weekly")}
            size={35}
          />
        )}
        <div className="Calendar-header">
          <div className="Calendar-buttons">
            <RequestSwapBtn setOpenModal={setOpenModal} />
            <TodayButton setSelectedDay={setSelectedDay} />
          </div>
        </div>
        {calendar === "daily" && (
          <CalendarHeaderInfo settingHrsObj={settingHrsObj} />
        )}
        <div className="Calendar-view">
          <Routes>
            <Route
              path="/weekly"
              element={
                <WeeklyCalendarMobile
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                  settingHrsObj={settingHrsObj}
                  timeZone={userTimeZone}
                />
              }
            />

            <Route
              path="/daily"
              element={
                <DailyCalendar
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                  settingHrsObj={settingHrsObj}
                  timeZone={userTimeZone}
                />
              }
            />
          </Routes>
        </div>
      </div>
    );
  };

  return (
    <div className="Calendars">
      {width >= 700 ? webViewCals() : mobileViewCals()}
      {openModal && (
        <div className="Side-modal-container">
          <SwapShiftRequest setOpenModal={setOpenModal} />
        </div>
      )}
    </div>
  );
};

export default Calendar;
