import React, { useContext, useEffect, useState } from "react";
import moment from "moment";

import { StoreContext } from "../../components/authentication/StoreProvider";
import { LoginContext } from "../../components/authentication/LoginProvider";

import Schedule from "../../components/admin/schedule/Schedule";
import Sidebar from "../../components/admin/schedule/sidebar/Sidebar";

import "./adminSchedule.css";

const AdminSchedule = () => {
  const userId = useContext(LoginContext).user?.id;
  const storeId = useContext(StoreContext).store?.Store_idStore;
  const positions = useContext(StoreContext).positions;
  const storeTimeZone =
    useContext(StoreContext).store?.store.timeZone;

  const [schedules, setSchedules] = useState();
  const [startDaysOfWeek, setStartDaysOfWeek] = useState();
  const [selectedStart, setSelectedStart] = useState();
  const [empList, setEmpList] = useState([]);
  const [filters, setFilters] = useState({
    hours: [],
    positions: [],
    employees: [],
  });
  const [schedModalOpen, setSchedModalOpen] = useState(false);
  const [resetFilter, setResetFilter] = useState(false);
  const [settingHrsObj, setSettingHrsObj] = useState({
    startTimeOfDay: moment.tz("06:00", "HH:mm", storeTimeZone),
    scheduleHrs: 18,
  });
  const [selectedPeriodStart, setSelectedPeriodStart] = useState(
    moment.tz(moment(), storeTimeZone).startOf("week")
  );
  const [selectedDate, setSelectedDate] = useState({
    starttime: moment(),
    endtime: moment(),
  });
  const [selectedSched, setSelectedSched] = useState({
    User_idUser: "",
    Store_idStore: "",
    starttime: "",
    endtime: "",
    workcode: 0,
  });
  const [width, setWidth] = useState(window.innerWidth);
  // const userId = useContext(LoginContext).user?.id || 9;
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  // console.log("context", useContext(LoginContext).user, useContext(StoreContext).store )
  //Set an array with 4 consecutive Sundays for scheduling periods
  useEffect(() => {
    const setWeeksArray = () => {
      const startThisWeek = selectedPeriodStart;
      const weekArray = [];
      for (let i = 0; i < 4; i++) {
        const newWeekStart = startThisWeek?.clone().add(i, "weeks");
        weekArray.push(newWeekStart);
      }
      //set variable startDaysOfWeek
      setStartDaysOfWeek(weekArray);
      //set initial period to this week.
      setSelectedStart(weekArray[0]);
    };
    setWeeksArray();
  }, [selectedPeriodStart]);

  //Read scheudles
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const startDay = selectedStart?.clone().format();
        const data = await fetch(
          `/api/schedule/weekly?storeId=${storeId}&userId=${userId}&startDay=${startDay}`
        );
        const scheduleData = await data.json();
        console.log("Fetched weekly schedule data", scheduleData);

        const scheduleArray = [
          ...scheduleData.mySchedules,
          ...scheduleData.coworkersSchedules,
        ];
        setSchedules(() => scheduleArray);
      } catch (err) {
        console.log("Failed to fetch schedule data", err);
        setSchedules(() => null);
      }
    };
    selectedStart && fetchAllData();
  }, [selectedStart, schedModalOpen]);

  useEffect(() => {
    // const coleredPosArray = setPositionList(schedules);
    //set EmployeeList for employee filter
    const getEmployeeList = () => {
      const employeeList = [];
      schedules?.map((sched) => {
        const foundPos = positions.find((p) => sched.positionId === p.id);
        console.log("sched", foundPos);
        employeeList.push({
          userId: sched.userId,
          firstname: sched.firstname,
          lastname: sched.lastname,
          position: foundPos,
        });
      });
      setEmpList(() => employeeList);
      setFilters((pre) => {
        return { ...pre, employees: employeeList };
      });
    };
    filters?.employees.length === 0
      ? getEmployeeList()
      : setFilters((pre) => {
          return { ...pre, employees: pre.employees };
        });
  }, [schedules]);

  //Set initial filter(employees, availability, positions) values
  useEffect(() => {
    //set position variables
    //Set position filter with boolean
    const getInitialPositions = () => {
      positions?.map((p) => (p.value = true));
      setFilters((pre) => {
        return { ...pre, positions: positions };
      });
    };
    console.log("filtere", filters);
    //add hours with boolean
    const getInitialHrs = () => {
      const initialhrsArray = [
        { type: "> 30hrs", max: null, min: 30, value: true },
        { type: "20hrs - 30hrs", max: 30, min: 20, value: true },
        { type: "< 20hrs", max: 20, min: 0, value: true },
      ];
      setFilters((pre) => {
        return { ...pre, hours: initialhrsArray };
      });
    };
    // setInitialvalue only when rendered first and refresh button clicked.
    if (filters?.positions.length === 0 || resetFilter) {
      getInitialPositions();
    }
    if (filters?.hours.length === 0 || resetFilter) {
      getInitialHrs();
    }
    setResetFilter(false);
  }, [schedules, resetFilter]);

  return width >= 700 ? (
    <div className="Admin-schedule">
      <div className="schedule-container">
        <Schedule
          selectedDay={selectedStart}
          settingHrsObj={settingHrsObj}
          schedules={schedules}
          filters={filters}
          setSchedModalOpen={setSchedModalOpen}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedSched={selectedSched}
          setSelectedSched={setSelectedSched}
          width={width}
        />
      </div>
      <div className="Side-bar-container">
        <Sidebar
          storeZone={storeTimeZone}
          startDaysOfWeek={startDaysOfWeek}
          selectedStart={selectedStart}
          setSelectedStart={setSelectedStart}
          filters={filters}
          setFilters={setFilters}
          empList={empList}
          selectedPeriodStart={selectedPeriodStart}
          setSelectedPeriodStart={setSelectedPeriodStart}
          storeTimeZone={storeTimeZone}
          setResetFilter={setResetFilter}
          width={width}
        />
      </div>
    </div>
  ) : (
    <div>mobile is not available for scheduling. Please, use tablet or pc.</div>
  );
};

export default AdminSchedule;
