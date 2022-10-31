const scheduleByType = (data) => {
  const workScheds = data.filter((sched) => sched.workcode === 0);
  const vacScheds = data.filter((sched) => sched.workcode === 1);
  return { workScheds, vacScheds };
};
const formatSchedData = (data) => {
  console.log("res format1", data)
  const res = [];
  data?.map((emp) => {
    const dataObj = {
      userId: emp.User_idUser,
      storeId: emp.Store_idStore,
      firstname: emp.user.firstname,
      lastname: emp.user.lastname,
      positionId: emp.UserProfile_idUserProfile,
      // position: emp.userprofile.name,
      schedules: emp.user.schedule,
      availability:
        emp.user.employee_sched_availability &&
        emp.user.employee_sched_availability[0],
    };
    emp.user.inactive === false && res.push(dataObj);
  });
  return res;
};
const formatOnlyEmpWithSched = (data) => {
  console.log("res format1", data)
  const res = [];
  data?.map((emp) => {
    if(emp.user.schedule.length !== 0){

      const dataObj = {
        userId: emp.User_idUser,
        storeId: emp.Store_idStore,
        firstname: emp.user.firstname,
        lastname: emp.user.lastname,
        positionId: emp.UserProfile_idUserProfile,
        // position: emp.userprofile.name,
        schedules: emp.user.schedule,
        availability:
        emp.user.employee_sched_availability &&
        emp.user.employee_sched_availability[0],
      };
      emp.user.inactive === false && res.push(dataObj);
    }
  });
  return res;
};
const format = (data) => {
  console.log("res format2", data)
  const res = [];
  data?.map((emp) => {
    const dataObj = {
      userId: emp.User_idUser,
      storeId: emp.Store_idStore,
      firstname: emp.user.firstname,
      lastname: emp.user.lastname,
      positionId: emp.UserProfile_idUserProfile,
      // position: emp.userprofile.name,
      schedules: scheduleByType(emp.user.schedule),
      availability:
        emp.user.employee_sched_availability &&
        emp.user.employee_sched_availability[0],
    };
    emp.user.inactive === false && res.push(dataObj);
  });
  return res;
};
const addSwapReq = (weekUserData, swapReqSchedule) => {
  weekUserData[0].schedules.map((data) => {
    swapReqSchedule.map((swap) => {
      // console.log('data', data, swap)
      if (data.idSchedule === swap.schedule.idSchedule) {
        console.log("data", data, swap);
        data.requestedSwap = true;
        if (swap.approved) {
          data.approved = true;
        } else {
          data.approved = false;
        }
      } else {
        data.requestedSwap = false;
      }
    });
  });
};
const addSwapReqSepSched = (weekUserData, swapReqSchedule) => {
  console.log("addSwapReqSep2", weekUserData[0].schedules, swapReqSchedule);
  weekUserData[0].schedules.workScheds.map((data) => {
    swapReqSchedule.map((swap) => {
      // console.log('data', data, swap)
      if (data.idSchedule === swap.schedule.idSchedule) {
        data.requestedSwap = true;
        if (swap.approved) {
          data.approved = true;
        } else {
          data.approved = false;
        }
      } else {
        data.requestedSwap = false;
      }
    });
  });
  weekUserData[0].schedules.vacScheds.map((data) => {
    swapReqSchedule.map((swap) => {
      // console.log('data', data, swap)
      if (data.idSchedule === swap.schedule.idSchedule) {
        console.log("data", data, swap);
        data.requestedSwap = true;
        if (swap.approved) {
          data.approved = true;
        } else {
          data.approved = false;
        }
      } else {
        data.requestedSwap = false;
      }
    });
  });
};
// const format
const filterDuplicates = (data) => {
  const uniqueIds = new Set();
  const newArray = [];
  data.map((pos) => {
    const profileId = pos.userprofile.idUserProfile;
    const name = pos.userprofile.name;
    const isDuplicate = uniqueIds.has(pos.userprofile.idUserProfile);
    uniqueIds.add(profileId);
    if (!isDuplicate) {
      return newArray.push({ profileId, name });
    }
  });
  // console.log("data changed", data, newArray);
  return newArray;
};
module.exports = {
  formatSchedData,
  format,
  addSwapReq,
  addSwapReqSepSched,
  filterDuplicates,
  formatOnlyEmpWithSched
};
