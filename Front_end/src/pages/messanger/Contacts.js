import React from 'react'
import FindCoworkers from '../../components/messaging/FindCoworkers'
import Unread from '../../components/messaging/Unread'
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import { ThemeProvider } from '@emotion/react';
import theme  from '../../components/utils/muiTheme';

const Contacts = () => {
  return (
    
    <Container sx={{ mt: "20vh" }}>
      <ThemeProvider theme={theme}>
     <Box
          display="flex"
          flexDirection="column"
          mb={3}
          sx={{ width: "50%", margin: "auto" }}
        >
    <div>
      <h2 style={{color: "#00b3b4"}}>Wink Messaging</h2></div>
    <FindCoworkers/>
    <Unread/>
    </Box>
    </ThemeProvider>
    </Container>
  )
}

export default Contacts