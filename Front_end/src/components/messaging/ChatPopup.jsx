// import React, { useState } from 'react'
// import Messaging from './Messaging';
// import "./ChatPopup.css";
// import { AiFillMessage, AiOutlineMessage } from 'react-icons/ai';

// //use AiOutlineMessage to show notification when message is unread
// const ChatPopup = () => {
//     const [show, setShow] = useState(false);
//   return (<div>
//     <div className={show ? "popup show" : "popup"}>
//         <Messaging show={show} />
        
//         </div>
        
//         <button className={show ? 'chat-btn' : "chat-btn-active"} onClick={() => setShow(prevCheck => !prevCheck)} > <AiFillMessage size={70}/> </button>
//         </div>
//   )
// }

// export default ChatPopup