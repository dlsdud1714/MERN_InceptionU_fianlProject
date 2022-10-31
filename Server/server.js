const express = require("express");
const app = express();
const projectRoutes = require("./server/routes/ProjectRoutes");
const scheduleRoutes = require("./server/routes/ScheduleRoutes");
const swapShiftRoutes = require("./server/routes/swapShiftRoutes");
const authRoutes = require("./server/routes/authRoutes");
const userRoutes = require("./server/routes/userRoutes");
const messageRoutes = require("./server/routes/messageRoutes");
const calendarEventsRoutes = require("./server/routes/calendarEventsRoutes");

const passport = require("passport");
const session = require("express-session");
const { updateMessages, findStoreAdmins, sendAdminsShiftSwapRequest } = require("./model/messaging");
app.use(session({ secret: "apple", cookie: { maxAge: 60000 } }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use("/api", projectRoutes);

app.use("/api", authRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/swapShift", swapShiftRoutes);
app.use("/api", userRoutes);
app.use("/api", messageRoutes);
app.use("/api", calendarEventsRoutes);

const PORT = 4000;
function echoPortNumber() {
  console.log(`Listening on port ${PORT}`);
}

//creating socket server for messenger
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

io.sockets.on("connect", (socket) => {
  socket.on("join", (data) => {
    socket.join(data);
    console.log(`${data} joined the room`);
  });

  socket.on("chat", (chat) => {
    // console.log("socket chat", chat);
    updateMessages(chat)
      .then((messages) => {
        // console.log("messages", messages);
        io.in("socket").emit("read", messages);
      })
      .catch((err) => {
        console.log("error is", err);
      });
  });

  socket.on("notify", (data) => {
    // console.log("socket notify", data);
    io.in("socket").emit("notification", data);
  });

  socket.on("findStoreAdmins", (data) => {
    // console.log("socket findStoreAdmins", data);
    findStoreAdmins(JSON.parse(data)).then((admins) => {
      // console.log("socket admins", admins);
      socket.emit("storeAdmins", admins);
    });
  });

  socket.on("shiftSwapMessage", (data) => {
    // console.log("socket shiftSwapMessage", data);
    sendAdminsShiftSwapRequest(data)
  });


  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    // socket.leave(roomId);
    console.log("socket is disconnected", socket.id);
  });
});

server.listen(PORT, echoPortNumber);
