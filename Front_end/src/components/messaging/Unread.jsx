import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../authentication/StoreProvider";
import { MessageContext } from "./MessageContext";

const Unread = () => {
  const storeContext = useContext(StoreContext);
  const user = storeContext.store;
  const [unread, setUnread] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUnread = async (theUser) => {
      try {
        const user = {
          user: theUser.User_idUser,
          store: theUser.Store_idStore,
        };
        console.log("sending userId: " + typeof user);
        const response = await fetch("/api/unread", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        if (response.status === 200) {
          const data = await response.text();
          console.log("getting store data", data);
          const userData = JSON.parse(data);
          let uniqueObjArray = [
            ...new Map(userData.map((item) => [item["sender"], item])).values(),
          ];

          console.log("uniqueObjArray", uniqueObjArray);

          setUnread(uniqueObjArray);
          console.log("we have the users with unread messages", userData);
        } else {
          console.log("failed to get user data");
          setUnread([]);
        }
      } catch (err) {
        console.log("failed to get unread", err);
      }
    };
    if (user) {
      getUnread(user);
    }
  }, [user]);

  // useEffect(() => {
  //   console.log("unread", unread);
  //   let uniqueObjArray = [
  //     ...new Map(unread.map((item) => [item["sender"], item])).values(),
  //   ];

  //   console.log("uniqueObjArray", uniqueObjArray);
  //   // setUnread(uniqueObjArray);
  // }, [unread, ]);

  return (
    <div>
      <h3 style={{color: "#00b3b4"}}>Unread Messages</h3>
      <List>
        {unread ? (
          unread.map((message) => {
            return (
              <ListItem >
                <ListItemButton
                sx={{ border: "1px solid lightgrey", borderRadius: 1 }}
                  onClick={() => navigate("/messenger", { state: { message } })}
                >
                  <ListItemText
                    primary={message.user_messages_senderTouser.firstname}
                  />
                  <ListItemText
                    primary={message.user_messages_senderTouser.lastname}
                  />
                </ListItemButton>
              </ListItem>
            );
          })
        ) : (
          <div>No unread messages</div>
        )}
      </List>
    </div>
  );
};

export default Unread;
