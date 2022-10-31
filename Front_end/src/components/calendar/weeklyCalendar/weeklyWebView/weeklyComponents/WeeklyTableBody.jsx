import React, { useContext, useEffect, useState } from "react";
import DisplayOthersSched from "./weeklyTableBody/DisplayOthersSched";
import DisplayMySched from "./weeklyTableBody/DisplayMySched";
import { LoginContext } from "../../../../authentication/LoginProvider";
import { StoreContext } from "../../../../authentication/StoreProvider";
import { Store } from "@mui/icons-material";


const WeeklyTableBody = (props) => {
  const { selectedDay, settingHrsObj, daysInWeek, timezone, filter,openModal } =
    props;
  const userId = useContext(StoreContext).store?.User_idUser;
  const storeId = useContext(StoreContext).store?.Store_idStore ;
 
console.log('userContext', useContext(StoreContext).store)
  const [mySched, setMySched] = useState();
  const [cowokersSched, setCoworkersSched] = useState();
  const [swapReqScheds, setSwapReqScheds]= useState();
  const [filteredEmpSched, setFilteredEmpSched] = useState();

  const startDay = selectedDay?.clone().startOf("week");

  //set schdules & position colors
  useEffect(() => {
    const getAllSchedules = async () => {
      try {
        console.log("fetching useEffect", userId, storeId)
        //need to fetch schedule with priod from server
        const weekStart = startDay?.clone().format();
        const res = await fetch(
          `/api/schedule/weekly?storeId=${storeId}&userId=${userId}&startDay=${weekStart}`
        );
        const scheduleData = await res.json();
          
        setMySched(() => scheduleData.mySchedules);
        setCoworkersSched(() => scheduleData.coworkersSchedules);
  
      } catch (err) {
        console.log("Failed to fetch schedule data", err);
        setMySched(() => null);
        setCoworkersSched(() => null);
      }
    };
    startDay && getAllSchedules();
  }, [selectedDay, storeId,openModal]);

  useEffect(() => {
    const applyFilter = () => {
      // console.log("filter", filter, filter==="All");
      if (filter === "All") {
        console.log("all filter")
        return setFilteredEmpSched(() => cowokersSched);
      } else if (filter === "My Position") {
        const filteredByPosition = cowokersSched?.filter(
          (sched) => {
            console.log('filtererror', sched, mySched[0])
            return sched.positionId === mySched[0].positionId}
        );
        console.log("filteredByposiotn", filteredByPosition);
        return setFilteredEmpSched(() => filteredByPosition);
      } else if (filter === "Working") {
        const filteredByWorking = cowokersSched?.filter(
          (sched) => sched.schedules.length !== 0
        );
        return setFilteredEmpSched(()=>filteredByWorking);
      } else {
        return console.log("Can not find filter");
      }
    };
    applyFilter();
    // console.log("seted scheduels",filteredEmpSched)
  }, [filter, selectedDay, cowokersSched, mySched]);

  return (
    <>
      <div className="Empty-div"></div>
      {mySched && (
        <DisplayMySched
          myProfile={mySched[0]}
          daysInWeek={daysInWeek}
          settingHrsObj={settingHrsObj}
          timezone={timezone}
          swapReqScheds={swapReqScheds}
        />
      )}

      {cowokersSched && (
        <DisplayOthersSched
          schedules={filteredEmpSched}
          daysInWeek={daysInWeek}
          settingHrsObj={settingHrsObj}
          timezone={timezone}
        />
      )}
    </>
  );
};

export default WeeklyTableBody;
