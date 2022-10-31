import moment from "moment";
import React, { useState, useContext } from "react";
import TodayButton from "../../components/Reusables/components/TodayButton";
import WeeklyCalendar from "../../components/calendar/weeklyCalendar/weeklyWebView/WeeklyCalendarWeb";
import ChatPopup from "../../components/messaging/ChatPopup";

import PersonalTasks from "../../components/tasks/PersonalTasks";
import Training from "../../components/training/Training";
import "./homepage.css";
import { StoreContext } from "../../components/authentication/StoreProvider";
import WeeklyFilters from "../../components/calendar/weeklyCalendar/weeklyWebView/WeeklyFilters";

const HomePage = () => {
const storeContext = useContext(StoreContext);
// console.log("this is on the homepage", storeContext);
  const [show, setShow] = useState(false);
  const [selectedDay, setSelectedDay] = useState(moment());
  const [filter, setFilter] = useState("All");
  const filterList = ["All", "My Position", "Working"];

  return (
    <div className="home">
      <div className="calendar-container">
        <div className="calendar-header">
          <WeeklyFilters filter={filter} setFilter={setFilter} filterList={filterList}/>
          <TodayButton setSelectedDay={setSelectedDay} />
        </div>
        <WeeklyCalendar
          className="calendar"
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          filter={filter}
        />
      </div>

      <Training className="training" />
      <PersonalTasks className="tasks" />
      <ChatPopup className="message" show={show} />
    </div>
  );
};

export default HomePage;
