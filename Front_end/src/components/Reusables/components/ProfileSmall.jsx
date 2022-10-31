import React from "react";
import { ProfileIcon } from "./ProfileIcon";

const ProfileSmall = ({ emp, position, i, index,calcHrsinWeek,schedHrsinWeek }) => {
  // console.log("position in profileSmall", emp,position)
  return (
    <div className="WeeklyCal-Profiles others" key={`profile ${i} ${index}`}>
      {index === 0 && (
        <div className="title" key={`position ${i}`}>
          <ProfileIcon position={position}/>
          <div className="name">{position?.type}</div>
        </div>
      )}
      <div className="profile" key={`profile ${index}`}>
        <div key={`name ${index}`} className="Name-container">
          <div className="name">
            {emp?.firstname}, {emp?.lastname}
          </div>
          {schedHrsinWeek&&<div className="scheduled-Hrs">{calcHrsinWeek}/{schedHrsinWeek||0} hrs</div>}
        </div>
      </div>
    </div>
  );
};

export default ProfileSmall;
