import React, { useEffect, useState } from "react";

import DailyCalendarTable from "./dailyComponents/DailyCalendarTable";

import "./DailyCalendar.css";

import { useContext } from "react";
import { StoreContext } from "../../authentication/StoreProvider";
// import moment from "moment";
import { LoginContext } from "../../authentication/LoginProvider";

const DailyCalendar = (props) => {
  const { selectedDay, setSelectedDay,settingHrsObj, timeZone } = props;

  const [myDaySchedules, setMyDaySchedules] = useState();
  const [coworkerDaySchedules, setCoworkerDaySchedules] = useState();

  const storeId = useContext(StoreContext).store?.Store_idStore ;
  const userId = useContext(LoginContext).user?.id ;

  useEffect(() => {
    const getAllSchedules = async () => {
      try {
        const day = selectedDay.clone().format("YYYY-MM-DD");
        // console.log('selectedday', day)
        const schedules = await fetch(
          `/api/schedule/daily?storeId=${storeId}&userId=${userId}&day=${day}`
        );

        const res = await schedules.json();
        console.log("Fetched daily schedules", res);

        setMyDaySchedules(() => res.mySchedules);
        setCoworkerDaySchedules(() => res.coworkersSchedules);

      } catch (err) {
        console.log("Failed to fetch daily schedules", err);
        setMyDaySchedules(() => null);
        setCoworkerDaySchedules(() => null);
      }
    };
    storeId && getAllSchedules();
  }, [selectedDay]);

  return (
    <div className="DailyCal-container">
    
      <DailyCalendarTable
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        myDaySchedules={myDaySchedules}
        coworkerDaySchedules={coworkerDaySchedules}
        settingHrsObj={settingHrsObj}
        timezone={timeZone}
      />
    </div>
  );
};

export default DailyCalendar;
