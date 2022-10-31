import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { StoreContext } from '../../../../authentication/StoreProvider';
import { ProfileIcon } from '../../../../Reusables/components/ProfileIcon';
// import ScheduleBar from '../../Reusables/components/ScheduleBar';

const MyDailySched = (props) => {
  const {mySched, displaySched} = props;
  const [position, setPosition] = useState({});
  const positions = useContext(StoreContext).positions;

  useEffect(()=>{
    setPosition(()=>positions.find((pos)=>mySched?.positionId===pos.id))
  },[positions, mySched])

  return (
    
    <>
      <div className='profile-container my'>
        <ProfileIcon position={position}/>
        <div className='name'>{mySched?.firstname}, {mySched?.lastname} (me)</div>
      </div>
     
      <div className="schedules-container my">

      {displaySched(mySched?.schedules,mySched?.userId)}
      </div>
    </>
  
  )
}

export default MyDailySched