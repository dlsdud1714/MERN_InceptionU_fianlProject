import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../authentication/StoreProvider";
import { LoginContext } from "../authentication/LoginProvider";
import { Button, Container, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../utils/muiTheme";
import { useLocation } from "react-router-dom";
import { MessageContext } from "./MessageContext";


const Message = () => {
  const authContext = useContext(LoginContext);
  const storeContext = useContext(StoreContext);
  
  const user = storeContext.store;

  const [message, setMessage] = useState("");
  const [receiver, setReceiver] = useState("");
  const location = useLocation();

  const socket = useContext(MessageContext).socketRef;

  useEffect(() => {
    location.state.profile ? (
      setReceiver(location.state.profile.User_idUser)
    ) : (
      setReceiver(location.state.message.sender)
    );
  }
  , [location.state]);


  const sendMessage = async (message) => {
   
    try {
 
      const chat = {
        sender: user.User_idUser,
        receiver: receiver,
        chat: message,
        store: user.Store_idStore,
      };

      console.log("location", receiver);
      console.log("sending message", chat);
      const data = JSON.stringify(chat);
      const response = await fetch("/api/createconversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });
      if (response.status === 200) {
        let notify = {
          // user: location.state.profile.User_idUser,
          store: user.Store_idStore,
        }
        console.log("sending notification", notify);
        socket.emit("notify", notify);
        setMessage("");
        console.log(response);
        const theMessage = JSON.parse(await response.text());
        console.log("we have the message", theMessage);
      } else {
        console.log("failed to send message");
      }
    } catch (err) {
      console.log("failed to send to user", user);
      console.log("failed to send store", location.state.profile);
      console.log("failed to send message", location.state.message);
      console.log("error sending message", receiver);
      console.log("error sending message", err);
    }
  

  };

  return (
    <Container sx={{ mt: 0 }}>
      <ThemeProvider theme={theme}>
        <Box
          display="flex"
          flexDirection="column"
          mb={3}
          sx={{ width: "50%", margin: "auto" }}
        >
          <TextField
            label="Message"
            variant="standard"
            type="text"
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
          <Button variant="contained" onClick={() => sendMessage(message)}>
            Send message
          </Button>
        </Box>
      </ThemeProvider>
    </Container>
  );
};

export default Message;


 // } } else { 
    //   try {
    //     const chat = {
    //       sender: user.User_idUser,
    //       receiver: location.state.message.receiver,
    //       chat: message,
    //       store: user.Store_idStore,
    //     };
    //     console.log("location", location.state.profile.User_idUser);
    //     console.log("sending message", chat);
    //     const data = JSON.stringify(chat);
    //     const response = await fetch("/api/createconversation", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: data,
    //     });
    //     if (response.status === 200) {
    //       let notify = {
    //         // user: location.state.profile.User_idUser,
    //         store: user.Store_idStore,
    //       }
    //       console.log("sending notification", notify);
    //       socket.emit("notify", notify);
    //       setMessage("");
    //       console.log(response);
    //       const theMessage = JSON.parse(await response.text());
    //       console.log("we have the message", theMessage);
    //     } else {
    //       console.log("failed to send message");
    //     }
    //   } catch (err) {
    //     console.log("failed to send to user", user);
    //     console.log("failed to send store", location.state.profile);
    //     console.log("failed to send message", location.state.message);
    //     console.log("error sending message", err);
    //   } }