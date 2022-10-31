import moment from 'moment';
import React from 'react'
import './style/todayButton.css'

const TodayButton = (props) => {
    const {setSelectedDay} = props;

    const setToToday = () => {
        const today = moment();
        setSelectedDay(today);
      };
  return (
    <button className="today" onClick={setToToday}>
        Today
      </button>
  )
}

export default TodayButton