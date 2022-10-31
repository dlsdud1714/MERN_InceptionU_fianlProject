const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getCalEventsForMonth = async (startOfHoliday, endOfHoliday) => {
  try {
    const result =
      await prisma.$queryRaw`select distinct nameEn,event_date from employee_calendar_events where event_date between ${startOfHoliday} and ${endOfHoliday} and archieve=0`;
    
    //console.log("Events fetched", result);
    return result;
  } catch (err) {
    console.log("Error fetching calendar events");
  }
};

const addEvent = async (eventDate, eventName) => {
  console.log("eventDate eventName",eventName,new Date(eventDate))
  try {
    const result = await prisma.employee_calendar_events.create({
      data : {
        event_date:new Date(eventDate),
        nameEn:eventName,
        archieve:(false)
      }
    }
    )
    //console.log("add events result", result);
  
  } catch (err) {
    console.log("Error inserting event",err);
  }
};

const deleteEvent = async (eventDate,  eventName) =>{
try {
  const result = await prisma.$queryRaw`update employee_calendar_events set archieve=1 where event_date=${eventDate}`
  return result

} catch (err) {
  console.log("Error editing event")
}

 
}
module.exports = { getCalEventsForMonth, addEvent, deleteEvent };
