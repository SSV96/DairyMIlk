const express = require("express");
const dairyMilkController = require("../Controllers/dairyMilkController");

const router = express.Router();

//Creating Order
router.post("/add", dairyMilkController.placeOrder);

// // update order to change requried milk quantity
// router.put("/update/:id", dairyMilkController.updateOrder);

// // updating the order Status
// router.put("/updateStatus/:id", dairyMilkController.updateOrderStatus);

// //Deleting Order
// router.delete("/delete/:id", dairyMilkController.deleteOrder);

// //Checking the milk left for the day
// router.get("/checkCapacity/:date", dairyMilkController.getCapacityByDate);

module.exports = router;
