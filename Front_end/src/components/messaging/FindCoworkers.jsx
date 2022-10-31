import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../authentication/StoreProvider";
import { LoginContext } from "../authentication/LoginProvider";
import { useNavigate } from "react-router-dom";
import ContactsIcon from '@mui/icons-material/Contacts';
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
 
  Collapse,
} from "@mui/material";
import { Box } from "@mui/system";
import { ThemeProvider } from '@emotion/react';
import theme  from '../utils/muiTheme';

const FindCoworkers = (props) => {
  const authContext = useContext(LoginContext);
  const storeContext = useContext(StoreContext);
  const user = storeContext.store;
  const [coworkers, setCoworkers] = useState([]);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleCollapse = () => {
    setOpen(!open);
  };

  console.log("user", user);
  useEffect(() => {
    const getCoworkers = async (theUser) => {
      try {
        let userToSend = JSON.stringify(theUser);
        console.log("sending userId: " + typeof userToSend);
        const response = await fetch("/api/coworkers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: userToSend,
        });
        const data = await response.text();
        console.log("getting store data", data);
        const userData = JSON.parse(data);
        console.log(response);
        setCoworkers(userData);
        console.log("we have the user data", userData);
      } catch (err) {
        console.log("failed to get coworkers", err);
        setCoworkers([]);
      }
    };
    if (user) {
      getCoworkers(user);
    }
  }, [user]);

 

  return (
    <Box >
      <ThemeProvider theme={theme}>
      <List>
        <ListItem divider>
          <ListItemButton onClick={handleCollapse}>
            <ContactsIcon style={{color: "#00b3b4"}}/>
            <ListItemText primary={"Contacts"} style={{display: "flex", color: "#00b3b4", font: "bold" }} />
          </ListItemButton>
        </ListItem>
      </List>

      <Collapse in={open}>
        <List sx={{ width: "50vw", display: "flex", flexDirection: "column" }}>
          {coworkers ? (
            coworkers.map((profile, index) => {
              return (
                <ListItem
                key={index}
                  divider
                  sx={{ width: "50vw", display: "flex", flexDirection: "column",  color: "#00b3b4" }}
                >
                  <ListItemButton
                    key={index}
                    onClick={() => {
                      navigate("/messenger", {state: {profile}});
                      
                    }}
                  >
                    <ListItemText
                     key={index}

                      primary={`${profile.user.firstname}  ${profile.user.lastname}`}
                      secondary={profile.userprofile.name}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })
          ) : (
            <ListItem>
              <ListItemText primary="No coworkers found" />
            </ListItem>
          )}
        </List>
      </Collapse>
      </ThemeProvider>
    </Box>
  );
};

export default FindCoworkers;

