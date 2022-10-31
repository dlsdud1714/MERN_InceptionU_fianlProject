import socketClient from "socket.io-client";
import React, { createContext, useEffect, useState, useContext } from "react";
import { LoginContext } from "../authentication/LoginProvider";
import { StoreContext } from "../authentication/StoreProvider";


// const authContext = useContext(LoginContext);

const SERVER = "http://localhost:4000";

export const MessageContext = createContext({});



const MessageProvider = (props) => {
    const storeContext = useContext(StoreContext);
    // const user = storeContext.store;
  const [socketRef, setSocketRef] = useState(null);
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    console.log("useEffect");
    const socket = socketClient(SERVER);
    setSocketRef(socket);

    socket.on("connect", () => {
      console.log(`I'm connected with the back-end`);
    //   socket.join("rabbit");
    });
    
    socket.on("disconnect", () => {
        console.log(`I'm disconnected with the back-end`);


    })
    socket.on("joined", (data) => {
        console.log(`I'm joined with the back-end`, data);
    }
  )
    return () => {
        socket.removeAllListeners();
        socket.disconnect();
    }}

    , []);
// This needs to be updated to use the user data for the socket
    useEffect(() => {
        if (storeContext.store && socketRef) {
            let data = "socket"
                // user: storeContext.store.User_idUser,
                // store: storeContext.store.Store_idStore,

            
      console.log( "socket join", data);
      socketRef.emit("join", data);
  
    }},
    [storeContext.store, socketRef]);


    const children = props.children;
    const theValues = { socketRef };
    return (
      <MessageContext.Provider value={theValues}>
        {children}
      </MessageContext.Provider>
    );
  
};

export default MessageProvider;
