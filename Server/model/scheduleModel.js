const { PrismaClient } = require("@prisma/client");
const moment = require("moment");
// using `prisma` in your application to read and write data in DB
const prisma = new PrismaClient();

const getPositionId = async (User_idUser, Store_idStore) => {
  try {
    const data = await prisma.userprivileges.findMany({
      where: { Store_idStore, User_idUser },
      select: { UserProfile_idUserProfile: true },
    });
    return data[0].UserProfile_idUserProfile;
  } catch (err) {
    console.log("Error to check authenticated user", err);
  }
};
const getReqSwapSched = async (storeId, userId) => {
  try {
    const approvedTwoDaySched = await prisma.employee_shift_swap.findMany({
      where: {
        User_idUser: userId,
        Store_idStore: storeId,
        // approved: true,
        requestTimeStamp: {
          gte: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000),
        },
        schedule: { is: { archived: false } }
      },
      select: {
        idShiftSwap: true,
        approved: true,
        schedule: true,
      },
    });
    // console.log("approvedTow", approvedTwoDay);
    return approvedTwoDaySched;
  } catch (err) {
    console.log("Error to get approved sched", err);
  }
};

const getUserSchedsByStore = async (storeId, userId, startDay, endDay) => {
  try {
    const my = await prisma.userprivileges.findMany({
      where: { Store_idStore: storeId, User_idUser: userId },
      select: {
        User_idUser: true,
        Store_idStore: true,
        UserProfile_idUserProfile:true,
        // userprofile: { select: { name: true } },
        user: {
          select: {
            firstname: true,
            lastname: true,
            inactive: true,
            schedule: {
              where: {
                Store_idStore: storeId,
                endtime: { gte: new Date(startDay) },
                starttime: { lte: new Date(endDay) },
                archived: false,
              },
            },
            employee_sched_availability: {
              where: { Store_idStore: storeId },
            },
          },
        },
      },
      orderBy: { userprofile: { name: "asc" } },
    });
    // console.log("res", my);
    return my;
  } catch (err) {
    console.log("Error to get my schedules", err);
  }
};
const getCoworkersSchedsByStore = async (storeId, userId, startDay, endDay) => {
  try {
    const exceptMine = await prisma.userprivileges.findMany({
      where: { Store_idStore: storeId, User_idUser: { not: userId } },
      select: {
        User_idUser: true,
        Store_idStore: true,
        UserProfile_idUserProfile:true,
        // userprofile: { select: { name: true } },
        user: {
          select: {
            firstname: true,
            lastname: true,
            inactive: true,
            schedule: {
              where: {
                Store_idStore: storeId,
                endtime: { gte: new Date(startDay) },
                starttime: { lte: new Date(endDay) },
                archived: false,
              },
            },
            employee_sched_availability: {
              where: { Store_idStore: storeId },
            },
          },
        },
      },
      orderBy: { userprofile: { name: "asc" } },
    });
    // console.log('res', allEmployees)
    return exceptMine;
  } catch (err) {
    console.log("Error to get cowerkers' schedules ", err);
  }
};

const createSched = async (
  User_idUser,
  Store_idStore,
  starttime,
  endtime,
  workcode,
  archived
) => {
  try {
    const data = await prisma.schedule.create({
      data: {
        User_idUser,
        Store_idStore,
        starttime,
        endtime,
        workcode,
        archived,
      },
    });
    // console.log("response", data);
    return data;
  } catch (err) {
    console.log("Error to create schedule", err);
  }
};

const editSched = async (
  User_idUser,
  Store_idStore,
  starttime,
  endtime,
  workcode,
  idSchedule,
  archived
) => {
  try {
    const data = await prisma.schedule.update({
      where: { idSchedule },
      data: {
        User_idUser,
        Store_idStore,
        starttime: new Date(starttime),
        endtime: new Date(endtime),
        workcode,
        archived,
      },
    });
    // console.log("response", data);
    return data;
  } catch (err) {
    console.log("Error to edit schedule", err);
  }
};
const deleteSched = async (idSchedule) => {
  try {
    const data = await prisma.schedule.update({
      where: { idSchedule },
      data: {
        archived: true,
      },
    });
    // console.log("response", data);
    return data;
  } catch (err) {
    console.log("Error to archive schedule", err);
  }
};
module.exports = {
  getPositionId,
  getReqSwapSched ,
  getUserSchedsByStore,
  getCoworkersSchedsByStore,
  createSched,
  editSched,
  deleteSched,
};
