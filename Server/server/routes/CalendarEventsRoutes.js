const express = require("express");
const router = express.Router();
const {getCalEventsForMonth, addEvent} = require("../../model/calEventsModel");

router.get("/events", async (req, res) => {
    
 const startOfHoliday = req.query.startOfHoliday
 const endOfHoliday = req.query.endOfHoliday

  //console.log("startOfHoliday endOfHoliday ", startOfHoliday, endOfHoliday);
  const monthHolidays = getCalEventsForMonth(startOfHoliday, endOfHoliday);
  const holidayData = await monthHolidays;
  res.json({ holidayData });
});

router.post("/createEvents", async (req,res) =>{

  const eventDate = req.body.date
  const eventName = req.body.name
  //console.log("Events point", eventDate, eventName )
  const newEvent = addEvent(eventDate,eventName)
  const addedEvent = await newEvent
  res.json({addedEvent})
})

router.post("/deleteEvents", async (req,res) => {
  const eventDate = req.body.date
  const eventName = req.body.name
  const deleteEvent = deleteEvent(eventDate,eventName)
  const deletedEvent = await deleteEvent
  res.json({deletedEvent})

})
module.exports = router;
