import moment from "moment";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { LoginContext } from "../authentication/LoginProvider";
import { StoreContext } from "../authentication/StoreProvider";
import ConfirmModals from "./ConfirmModals";

import "./swapShiftRequest.css";

const SwapShiftRequest = (props) => {
  const { setOpenModal } = props;
  const storeId = useContext(StoreContext).store?.Store_idStore;
  const userId = useContext(StoreContext).store?.User_idUser;
  const [mySchedules, setMySchdules] = useState();
  const [swapList, setSwapList] = useState();
  const initialState = {
    userId: userId,
    storeId: storeId,
    date: "",
    reason: "",
    swapAvailableId: null,
    preferedSched:"",
    approved:false
  }

  const [request, setRequest] = useState(initialState);

  useEffect(() => {
    const today = moment().format("YYYY-MM-DD");

    //get all my future schedules
    const getMySchedules = async () => {
      try {
        const data = await fetch(
          `/api/swapShift/swapShiftRequest?storeId=${storeId}&myId=${userId}&from=${today}`
        );
        const dataObj = await data.json();
        console.log("Fetched schedules for shift swap", dataObj);
        setMySchdules(() => dataObj.mySchedules);
        setSwapList(() => dataObj.schedulestoSwap);
      } catch (err) {
        console.log("Failed to fetch schedules for shift swap", err);
        setMySchdules(() => null);
      }
    };
    getMySchedules();
  }, []);


  const updateReq = (e) => {
   
    const { name, value, type, id } = e.target;
    setRequest((pre) => {
      if (type === "radio") {
        console.log('radio', id)
        return {
          ...pre,
          swapAvailableId: name*1,
          preferedSched: " in exchange for " + id,
        };
      }else if(name==="date"){
        const idNDate = value.split('/')
        return {...pre, scheduleId: idNDate[0]*1,[name]:idNDate[1]}
      } 
      else {
        console.log("value", value)
        return { ...pre, [name]: value };
      }
    });
  };

  const resetRequest = () => {
    console.log("reset request");
    setRequest(initialState);
  }

  return (
    <div className="Shiftswap">
      <button className="close" onClick={()=>setOpenModal(false)}>x</button>
      <ConfirmModals request={request} setOpenModal={setOpenModal} resetRequest={resetRequest} />
      <div className="date">
        <label htmlFor="date">*Date: </label>
        <select
          name="date"
          className="Day-lists"
          onChange={updateReq}
          value={`${request?.scheduleId}/${request?.date}`}
        >
          <option value="">--Select date--</option>
          {mySchedules?.schedules.length ? (
            mySchedules.schedules.map((sched, i) => {
              const option = moment(sched.starttime).format("ddd, MMM Do");
              if (sched.workcode === 0) {
                return <option key={`swapAvailDate ${i}`} value={`${sched.idSchedule}/${option}`}>{option}</option>;
              }
            })
          ) : (
            <option value="">No schedule found</option>
          )}
        </select>
      </div>
      <div className="Reason-container">
        <label htmlFor="reason">*Reason: </label>
        <textarea
          name="reason"
          className="Reason-box"
          cols="30"
          rows="10"
          onChange={updateReq}
          value={request?.reason}
          maxLength="200"
        />
      </div>
      <div className="Schedules-container">
        <label htmlFor="schedules">
          Choose the best available shift (optional):{" "}
        </label>
        <div className="Container">
          {swapList?.map((sched) => {
            return sched.schedules.map((s, i) => {
              
              return (
                <div className="Schedule-conatiner" key={`swapAvail-container ${i}`}>
                  <input
                    type="radio"
                    name={s.idSchedule}
                    onChange={updateReq}
                    value={request.swapAvailableId}
                    key={`swapAvailList ${i}`}
                    id={`${moment(s.starttime).format("ddd, MMM Do h:mm a")} - ${moment(s.endtime).format("h:mm a")}`}
                    checked={request.swapAvailableId===s.idSchedule}
                  />
                  <label htmlFor={s.idSchedule} className="Schedule-label" key={`swapAvaillable ${i}`}>
                    <span key={`swapAvailstart ${i}`}>
                      {moment(s.starttime).format("ddd, MMM Do h:mm a")} -
                    </span>
                    <span key={`swapAvailend ${i}`}> {moment(s.endtime).format("h:mm a")} </span>
                  </label>
                </div>
              );
            });
          })}
        </div>
      </div>
    </div>
  );
};

export default SwapShiftRequest;
