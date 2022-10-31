import React from 'react'
import "./style/RequestSwapBtn.css"

const RequestSwapBtn = (props) => {
    const {setOpenModal} = props;

    const eventhanlder=()=>{
        setOpenModal((pre)=>!pre)
    }
  return (
    <button className="swapshift" onClick={eventhanlder}>Shift Swap Request</button>
  )
}

export default RequestSwapBtn