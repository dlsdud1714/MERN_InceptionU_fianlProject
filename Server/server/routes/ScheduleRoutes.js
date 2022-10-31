const {
  getPositionId,
  getReqSwapSched, 
  getUserSchedsByStore,
  getCoworkersSchedsByStore,
  createSched,
  editSched,
  deleteSched,
  
} = require("../../model/scheduleModel");

const { formatSchedData, format, addSwapReq,addSwapReqSepSched,formatOnlyEmpWithSched } = require("../utilities/function");
let express = require("express");
let router = express.Router();
const moment = require("moment");

const checkAdmin = async (req, res, next) => {
  try {
    console.log("user", req.body);
    const { User_idUser, Store_idStore } = req.body.user;
    console.log("Check admin on id: ", User_idUser, "Store: ", Store_idStore);
    const previlege = await getPositionId(User_idUser, Store_idStore);
    console.log("prepilageID", previlege);
    if (previlege === 1000 || previlege === 1002) {
      return next();
    } else {
      console.log("prepilageID to send", previlege);
      res.status(403).json({ message: "User doesn't have a permission." });
    }
    console.log("profielId", previlege);
  } catch (err) {
    console.log({ error: "Error to check authentication", message: err });
  }
};

router.get("/monthly", async (req, res) => {
  try {
    const storeId = req.query.storeId * 1;
    const userId = req.query.userId * 1;
    const startDayOfMonth = req.query.startOfMonth;
    const endOfMonth = moment(startDayOfMonth, "YYYY-MM-DD")
      .clone()
      .endOf("month")
      .format();
    //console.log("period in month", new Date(startDayOfMonth), endOfMonth);
    const monthlySchedule = await getUserSchedsByStore(
      storeId,
      userId,
      startDayOfMonth,
      endOfMonth
    );
    console.log("monthlySchedule", monthlySchedule[0].user.schedule);
    //const monthlyUserData = formatSchedData(monthlySchedule);
    const monthlyUserData = format(monthlySchedule);
    //console.log('text data',)
    res.status(200).json({ mySchedules: monthlyUserData });
  } catch (err) {
    res.status(err.statusCode).json("Error to get monthly schedules", err);
  }
  //console.log("monthlyUserData",monthlyUserData)
});

//Get all schedules in a period in a store
router.get("/weekly", async (req, res) => {
  try {
    //All employee Schedule
    const storeId = req.query.storeId * 1;
    const userId = req.query.userId * 1;
    const startDayofWeek = req.query.startDay;
    const endDayofWeek = moment(startDayofWeek)
      .clone()
      .add(1, "weeks")
      .utc()
      .format();
    console.log("period", startDayofWeek, endDayofWeek);

    const userSchedules = getUserSchedsByStore(
      storeId,
      userId,
      startDayofWeek,
      endDayofWeek
    );
    const coworkersSchedules = getCoworkersSchedsByStore(
      storeId,
      userId,
      startDayofWeek,
      endDayofWeek
    );
    const approvedSchedes = getReqSwapSched(storeId,userId);
    const userData = await userSchedules;
    const coworkersData = await coworkersSchedules;
    const swapReqSchedule = await approvedSchedes;
    console.log('scheds', swapReqSchedule)
    const weekUserData = formatSchedData(userData);
    // console.log('formated data', weekUserData)
    const weekCoworkersData = formatSchedData(coworkersData);
    addSwapReq(weekUserData, swapReqSchedule)
    console.log('result',weekUserData[0].schedules);
    res.json({
      mySchedules: weekUserData,
      coworkersSchedules: weekCoworkersData,
      // swapReqSchedules: swapReqSchedule
    });
  } catch (err) {
    res.json(`Error to get weekly schedules: ${err}`);
  }
});
router.get("/weekly/onlyMine", async (req, res) => {
  try {
    //All employee Schedule
    console.log(req);
    const storeId = req.query.storeId * 1;
    const userId = req.query.userId * 1;
    const startDayofWeek = req.query.startDay;
    const endDayofWeek = moment(startDayofWeek)
      .clone()
      .add(1, "weeks")
      .utc()
      .format();
    // console.log("period", startDayofWeek, endDayofWeek);
    const startDay = moment().clone().startOf("day").format();
    const endDay = moment().clone().endOf("day").format();
    console.log("start adn end", startDay, endDay);
    const userAllSchedules = getUserSchedsByStore(
      storeId,
      userId,
      startDayofWeek,
      endDayofWeek
    );

    const userTodaySchedules = getUserSchedsByStore(
      storeId,
      userId,
      startDay,
      endDay
    );
    const approvedSchedes = getReqSwapSched(storeId,userId);
    const userAllSchedsData = await userAllSchedules;
    const userTodayData = await userTodaySchedules;
    const swapReqSchedule = await approvedSchedes;
    const todayUserData = formatSchedData(userTodayData);
    const weekUserData = format(userAllSchedsData);
    console.log("scheds", todayUserData, weekUserData[0].schedules.workScheds,weekUserData[0].schedules.vacScheds);
    addSwapReqSepSched(weekUserData, swapReqSchedule)
    // console.log('result',weekUserData[0].schedules);
    res.json({
      myAllSchedules: weekUserData,
      myTodayWorkSched: todayUserData,
    });
  } catch (err) {
    res.json({ error: "Error to get weekly schedules", message: err });
  }
});

router.get("/daily", async (req, res) => {
  try {
    //All emplyees schedules
    const storeId = req.query.storeId * 1;
    const userId = req.query.userId * 1;
    const day = req.query.day;

    const startDay = moment(day, "YYYY-MM-DD").clone().startOf("day").format();
    const endDay = moment(day, "YYYY-MM-DD").clone().endOf("day").format();
    console.log("getting data from " + startDay + "to" + endDay);

    const userSchedules = getUserSchedsByStore(
      storeId,
      userId,
      startDay,
      endDay
    );
    const coworkersSchedules = getCoworkersSchedsByStore(
      storeId,
      userId,
      startDay,
      endDay
    );
    const userData = await userSchedules;
    const coworkersData = await coworkersSchedules;
    // console.log('scheds', userData, coworkersData)
    const dayUserData = formatSchedData(userData);
    const dayCoworkersData = formatOnlyEmpWithSched(coworkersData);
    res.json({
      mySchedules: dayUserData,
      coworkersSchedules: dayCoworkersData,
    });
  } catch (err) {
    res.json("Error to get daily schedules", err);
  }
});

router.post("/scheduling", checkAdmin, async (req, res) => {
  try {
    console.log("creating schedule with", req.body.data);
    const {
      User_idUser,
      Store_idStore,
      starttime,
      endtime,
      workcode,
      archived,
    } = req.body.data;
    await createSched(
      User_idUser,
      Store_idStore,
      starttime,
      endtime,
      workcode,
      archived
    );

    res.status(200).json({ message: "success" });
  } catch (err) {
    res.json("Error to create schedule", err);
  }
});

router.patch("/scheduling", checkAdmin, async (req, res) => {
  try {
    console.log("Editing schedule to", req.body.data);
    const {
      User_idUser,
      Store_idStore,
      starttime,
      endtime,
      workcode,
      idSchedule,
      archived,
    } = req.body.data;
    await editSched(
      User_idUser,
      Store_idStore,
      starttime,
      endtime,
      workcode,
      idSchedule,
      archived
    );

    res.status(200).json({ message: "success" });
  } catch (err) {
    res.json("Error to edit schedule", err);
  }
});

router.delete("/scheduling", checkAdmin, async (req, res) => {
  try {
    console.log("Archeiving schedule to", req.body.data);
    const idSchedule = req.body.data;
    await deleteSched(idSchedule * 1);

    res.status(200).json({ message: "success" });
  } catch (err) {
    res.json("Error to delete schedule", err);
  }
});
module.exports = router;
