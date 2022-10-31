const { PrismaClient } = require("@prisma/client");
// using `prisma` in your application to read and write data in DB
const prisma = new PrismaClient();

const createSchedules = async () => {
    const schedules = await prisma.schedule.createMany({
      data: 
        [
          {workcode: 0,starttime:new Date("2022-06-20 10:00:00-04:00"), endtime:new Date("2022-6-20 17:00:00-04:00"), User_idUser:5, Store_idStore:3},
          {workcode: 0,starttime:new Date("2022-06-21 10:00:00-04:00"), endtime:new Date("2022-6-21 17:00:00-04:00"), User_idUser:5, Store_idStore:3}
      ]
      
    });
  
    return schedules;
  };
  // createSchedules();
  const createSchedAvail = async()=>{
  const data = await prisma.employee_sched_availability.createMany({
    data:[{
      isFulltime:true,
      availHrsinWeek:40,
      User_idUser:5,
      Store_idStore:1,
    },{
      isFulltime:true,
      availHrsinWeek:40,
      User_idUser:6,
      Store_idStore:1,
    },]

  })
  return data
}
// createSchedAvail()