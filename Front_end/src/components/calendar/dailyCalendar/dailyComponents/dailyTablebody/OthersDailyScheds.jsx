import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../../authentication/StoreProvider";
import { ProfileIcon } from "../../../../Reusables/components/ProfileIcon";
import groupByPosition from "../../../../Reusables/functions/groupByPosition";

const OthersDailyScheds = (props) => {
  const { othersScheds, displaySched } = props;
  const [groupedScheds, setGroupedScheds] = useState();
  const positions = useContext(StoreContext).positions;

  useEffect(() => {
   
    const groupedObj = groupByPosition(othersScheds);

    setGroupedScheds(() => groupedObj);
  }, [othersScheds]);
  return (
    <>
      {positions?.map((position, i) => {
        const empInPosition = groupedScheds && groupedScheds[position.id];
       console.log('empPos', groupedScheds)
        if (empInPosition) {
          // console.log('others day positon', position)
          return empInPosition?.map((sched, index) => {
            return (<React.Fragment key={`OtherDaySched ${i} ${index} `}>
              <div
                className="profile-container others"
                key={`day-profile ${i} ${index}`}
              >
                <ProfileIcon position={position} />
                <div className="name">
                  {sched?.firstname}, {sched?.lastname}
                </div>
              </div>
            <div className="schedules-container other">
              {/* {console.log(sched?.firstname)} */}
              {displaySched(sched?.schedules, sched?.userId)}
            </div>
            </React.Fragment>)
          });
        }
      })}
    </>
  );
};
export default OthersDailyScheds;
