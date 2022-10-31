import React, { useContext, useEffect, useState } from "react";

import WeeklySchedBar from "./WeeklySchedBar";
import ProfileBig from "../../../../../Reusables/components/ProfileBig";
import { StoreContext } from "../../../../../authentication/StoreProvider";

const DisplayMySched = (props) => {
  const { myProfile, daysInWeek, settingHrsObj, timezone, swapReqScheds } =
    props;
  const positions = useContext(StoreContext).positions;
  const [position, setPosition] = useState();

  useEffect(() => {
    setPosition(() =>
      positions.find((pos) => myProfile?.positionId === pos.id)
    );
  }, [positions, myProfile]);

  return (
    <>
      <ProfileBig profile={myProfile} position={position} />

      <WeeklySchedBar
        daysInWeek={daysInWeek}
        settingHrsObj={settingHrsObj}
        schedules={myProfile?.schedules}
        timezone={timezone}
        swapReqScheds={swapReqScheds}
      />
    </>
  );
};

export default DisplayMySched;
