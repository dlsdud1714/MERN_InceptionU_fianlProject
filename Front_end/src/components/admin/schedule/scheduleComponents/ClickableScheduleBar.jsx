import React, { useState } from "react";
import moment from "moment";
import ScheduleBar from "../../../Reusables/components/ScheduleBar";
import { useEffect } from "react";
import AdminScheduleModal from "./AdminScheduleModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import findDaySchedule from "../../../Reusables/functions/findDaySchedule";

const ClickableScheduleBar = ({
  daysInWeek,
  timezone,
  employeeSched,
  position,
  setSchedModalOpen,
  selectedDate,
  setSelectedDate,
  selectedSched,
  setSelectedSched,
  settingHrsObj,
}) => {
  const [timeList, setTimeList] = useState();
  const [open, setOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [daySchedsForWeek, setDaySchedsForWeek] = useState();
  useEffect(() => {
    const getTimeList = () => {
      const timeOpen = settingHrsObj?.startTimeOfDay?.clone();
      const timeArray = [settingHrsObj?.startTimeOfDay?.format("hh:mm a")];
      const iterTimes = (settingHrsObj?.scheduleHrs * 60) / 15;
      for (let i = 0; i < iterTimes; i++) {
        timeArray.push(timeOpen?.add(15, "minutes").format("hh:mm a"));
      }
      setTimeList(() => timeArray);
    };
    getTimeList();
  }, []);

  // set initial values for schedule modal
  const scheduleAction = (e, sched) => {
    //set Date
    console.log("scheduleAction", e, sched);
    // const dayClicked = moment.tz(day, timezone);
    setSelectedDate(() => {
      return {
        starttime: sched.day,
        endtime: sched.day,
      };
    });
    //set Schedule
    if (sched.schedule) {
      console.log("Modal - editing schedule", sched);
      setSelectedSched(() => {
        return {
          idSchedule: sched.idSchedule,
          User_idUser: employeeSched.userId,
          Store_idStore: employeeSched.storeId,
          starttime: sched.originalStart.format(),
          endtime: sched.originalEnd.format(),
          workcode:sched.workcode,
          archived: false,
        };
      });
      setSelectedDate(() => {
        return {
          starttime: sched.originalStart,
          endtime: sched.originalEnd,
        };
      });
    } else {
      setSelectedSched((pre) => {
        console.log(
          "Modal - creating schedule",
          employeeSched
        );
        return {
          User_idUser: employeeSched.userId,
          Store_idStore: employeeSched.storeId,
          starttime: "",
          endtime: "",
          workcode:0,
          archived: false,
        };
      });
    }
    // open modal
    setOpen(true);
  };

  const onClickDelete = (e, foundSched) => {
    e.stopPropagation();
    setSelectedSched(foundSched);
    setConfirmModalOpen(true);
  };
  useEffect(() => {
    const scheduleArray = findDaySchedule(
      daysInWeek,
      employeeSched.schedules,
      timezone,
      settingHrsObj
    );
    //  console.log('shceudle array', scheduleArray)
    setDaySchedsForWeek(scheduleArray);
  }, [daysInWeek, settingHrsObj, employeeSched, timezone]);
  return (
    <>
      {daySchedsForWeek?.map((sched, i) => {
        // const now = moment.tz(moment(), timezone);
        const today = moment.tz(moment(), timezone).startOf('day');
        console.log("mapped sched", sched);
        if (!sched.schedule) {
          return (
            <div
            className={
              sched.day >= today
                ? "Schedule clickable"
                : "Schedule non-clickable"
            }
              key={`emptySched ${sched?.scheduleId} ${i}`}
              onClick={(e) => sched.day >= today && scheduleAction(e, sched)}
            ></div>
          );
        } else if (sched.schedule) {
          // console.log("returns schedule", sched.originalStart, now,sched.dayStart >= now )
          return (
            <div
              onClick={(e) => sched.day>= today && scheduleAction(e, sched)}
              key={`Sched ${sched?.idSchedule} ${i}`}
              className={
                sched.day >= today
                  ? "Schedule clickable"
                  : "Schedule non-clickable"
              }
              id={sched?.idSchedule}
            >
              {sched.day >= today && (
                <button
                  className="delete"
                  onClick={(e) => onClickDelete(e, sched)}
                >
                  x
                </button>
              )}
              <ScheduleBar
                dayStart={sched.dayStart}
                dayEnd={sched.dayEnd}
                newFrom={sched.newFrom}
                newTo={sched.newTo}
                workcode={sched.workcode}
                timezone={timezone}
                // displayHrs={false}
              />
              {sched.workcode === 0 && (
                <div className="text">
                  {sched.newFrom?.format("h:mma")}-
                  {sched.newTo?.format("h:mma")}
                </div>
              )}
            </div>
          );
        }
      })}
      <AdminScheduleModal
        employeeSched={employeeSched}
        position={position}
        selectedDate={selectedDate}
        selectedSched={selectedSched}
        timezone={timezone}
        setSelectedSched={setSelectedSched}
        open={open}
        setOpen={setOpen}
        timeList={timeList}
        setSchedModalOpen={setSchedModalOpen}
        setSelectedDate={setSelectedDate}
      />
      <DeleteConfirmModal
        selectedSched={selectedSched}
        setSelectedSched={setSelectedSched}
        employeeSched={employeeSched}
        confirmModalOpen={confirmModalOpen}
        setConfirmModalOpen={setConfirmModalOpen}
        setSchedModalOpen={setSchedModalOpen}
        timezone={timezone}
      />
    </>
  );
};

export default ClickableScheduleBar;
