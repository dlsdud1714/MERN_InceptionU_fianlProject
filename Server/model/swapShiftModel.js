const { PrismaClient } = require("@prisma/client");
// using `prisma` in your application to read and write data in DB
const prisma = new PrismaClient();

const getMySchedulesFrom = async (storeId, myId, from) => {
  try {
    const onlyMy = await prisma.userprivileges.findMany({
      where: { Store_idStore: storeId, User_idUser: myId },
      select: {
        User_idUser: true,
        Store_idStore: true,
        UserProfile_idUserProfile: true,
        // userprofile: { select: { idUserProfile: true, name: true } },
        user: {
          select: {
            firstname: true,
            lastname: true,
            inactive: true,
            schedule: {
              where: {
                Store_idStore: storeId,
                starttime: { gte: new Date(from) },
                archived: false,
              },
            },
          },
        },
      },
    });
    console.log(onlyMy);
    return onlyMy;
  } catch (err) {
    console.log("Error to get my future schedules", err);
  }
};

const getSchedulesToSwap = async (storeId, myId, positionId, from) => {
  try {
    // console.log("getScheudlfeToSwap", storeId, myId, positionId, from)
    const data = await prisma.userprivileges.findMany({
      where: {
        Store_idStore: storeId,
        UserProfile_idUserProfile: positionId,
        User_idUser: { not: myId },
      },
      select: {
        User_idUser: true,
        UserProfile_idUserProfile:true,
        // userprofile: { select: { idUserProfile: true, name: true } },
        user: {
          select: {
            firstname: true,
            lastname: true,
            inactive: true,
            schedule: {
              where: {
                Store_idStore: storeId,
                starttime: { gte: new Date(from) },
                archived: false,
              },
            },
          },
        },
      },
    });
    //Filtering empty schedules.
    const takenOutEmpty = data.filter((e) => e.user.schedule.length !== 0);
    // console.log("getSchedules to swap ", data)
    // console.log("filtered", takenOutEmpty);
    return takenOutEmpty;
  } catch (err) {
    console.log("Error to get schedules to swap", err);
  }
};

const createSwapShiftReq = async (
  userId,
  storeId,
  reason,
  swapAvailable,
  scheduleId,
  approved
) => {
  try {
    const data = await prisma.employee_shift_swap.create({
      data: {
        User_idUser: userId,
        Store_idStore: storeId,
        Schedule_idSchedule: scheduleId,
        possibleSwapShiftId: swapAvailable,
        requestTimeStamp: new Date(),
        approvedTimeStamp: null,
        reason: reason,
        approved: approved
      },
    });
    console.log("response", data);
    return data;
  } catch (err) {
    console.log("Error to create shift swap request",err);
  }
};

const approveShiftSwap = async (req) => {
  try {
    const data = await prisma.employee_shift_swap.update({
      where: {
        idShiftSwap: req.shiftSwap,
      },
      data: {
        approvedTimeStamp: new Date(),
        approved: true,
      },
    });
    console.log("response", data);
    return data;
  } catch (err) {
    console.log("Error to approve shift swap",err);
    return err;
  }
}


module.exports = {
  getMySchedulesFrom,
  getSchedulesToSwap,
  createSwapShiftReq,
  approveShiftSwap,
};
