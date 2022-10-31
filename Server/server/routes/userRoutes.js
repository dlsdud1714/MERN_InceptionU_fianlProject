var express = require("express");
var router = express.Router();
const { userStoreSelections, getAllPositionsByStore } = require("../../model/userModel");
const {filterDuplicates} =require('../utilities/function')
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// Get user store selections
router.post("/storeselection", async (req, res) => {
  // console.log("req.id is", req.body);
  try {
    // console.log("getting stores for id", req.body.id);
    const stores = await userStoreSelections(req.body.id);
    res.send(stores);
  } catch (error) {
    res.send(error);
  }
});
router.post('/getAllPositions', async(req,res)=>{
  try{
    const storeId = req.body.Store_idStore;
    const positions = await getAllPositionsByStore(storeId);
    console.log("success to here", positions)
    const onlyUniquePos = filterDuplicates(positions);
    res.send(onlyUniquePos)
  }catch(err){
    console.log(`error to send position data in store: ${err}`)
  }
})
module.exports = router;
