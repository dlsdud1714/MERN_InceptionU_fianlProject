var express = require("express");
var router = express.Router();
const {
  getCoworkers,
  createConversation,
  getConversations,
  updateMessages,
  getNotifications,
  getUnreadConversations,
  findStoreAdmins,
  sendAdminsShiftSwapRequest,
  approveShiftSwapMessage,
} = require("../../model/messaging");
const { PrismaClient } = require("@prisma/client");
const { approveShiftSwap } = require("../../model/swapShiftModel");
const { deleteSched } = require('../../model/scheduleModel')

const prisma = new PrismaClient();

router.post("/coworkers", async (req, res) => {
  // console.log("req.id is", req.body);

  try {
    // console.log("getting stores for id", req.body.storeId);
    const coworkers = await getCoworkers(
      req.body.Store_idStore,
      req.body.UserProfile_idUserProfile
    );
    // console.log("this is coworkers", coworkers);
    res.send(coworkers);
  } catch (error) {
    res.send(error);
  }
});

router.post("/createconversation", async (req, res) => {
  // console.log("req.body is", req.body);
  try {
    // console.log("creating conversation for id", req.body.sender);
    const conversation = await createConversation(req);

    // console.log("this is conversation", conversation);

    res.json(conversation);
  } catch (error) {
    res.send(error);
    console.log("error is", error);
  }
});

router.post("/getconversation", async (req, res) => {
  // console.log("req.body is", req.body);
  if (req.body.receiver) {
    try {
      // console.log("getting conversation for id", req.body.sender);
      const conversation = await getConversations(req);
      // console.log("this is conversation being sent to the message window", conversation);

      res.json(conversation);
    } catch (error) {
      res.send(error);
      console.log("error is", error);
    }
  } else {
    res.status(400).send("No receiver");
  }
});

router.post("/notifications", async (req, res) => {
  try {
    // console.log("getting conversation for id", req.body);
    const notification = await getNotifications(req);
    // console.log("this is the notification", notification);
    res.json(notification);
  } catch (error) {
    res.send(error);
    console.log("error is", error);
  }
});

router.post("/unread", async (req, res) => {
  try {
    console.log("getting conversation for id", req.body);
    const unread = await getUnreadConversations(req);
    console.log("this is the unread", unread);
    res.json(unread);
  } catch (error) {
    res.send(error);
    console.log("error is", error);
  }
});

router.post("/admins", async (req, res) => {
  try {
    console.log("getting admins for store", req.body.store);
    const admins = await findStoreAdmins(req.body.store);
    console.log("this is the admins", admins);
    res.json(admins);
  } catch (error) {
    res.send(error);
    console.log("error is", error);
  }
});

// router.post("/shiftSwapMessage", async (req, res) => {
//   try {
//     console.log("sending shift swap request message", req.body);
//     const message = await sendAdminsShiftSwapRequest(req.body);
//     console.log("this is the message", message);
//     res.json(message);
//   } catch (error) {
//     res.send(error);
//     console.log("error is", error);
//   }
// }
// );

router.post("/approveShiftSwap", async (req, res) => {
  try {
    console.log("approving shift swap request", req.body);
    const approve = await approveShiftSwap(req.body);
    const approveMessage = await approveShiftSwapMessage(req.body);
    console.log("this is the approve", approve);
    console.log("this is the approveMessage", approveMessage);
    await deleteSched(approve.Schedule_idSchedule);
    res.status(200).json({ message: "Shift swap request approved" });
  } catch (error) {
    res.send(error);
    console.log("error is", error);
  }
}
);



module.exports = router;
