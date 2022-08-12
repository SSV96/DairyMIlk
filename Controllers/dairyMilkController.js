const { order, milkStock } = require("../Models/dairyMilkModal");
const {
  HandleSuccess,
  handleError,
} = require("../ErrorHandlers/handlerrorSuccess");
exports.placeOrder = async (req, res) => {
  const data = req.body;

  try {
    const New_order = new order(data);
    const result = await New_order.save();
    console.log(data);
    HandleSuccess(res, "Order has been Placed Successfully ", result);
  } catch (error) {
    handleError(res, "", error);
  }
};

exports.deleteOrder = async (req, res) => {
  const data = [req.params.id];
  try {
    order.deleteOne({ _id: data }, function (err) {
      handleError(res, "Something went wrong", err);
      // deleted at most one tank document
    });
  } catch (error) {
    return res.status(500).send({
      message: "Something went wrong in deleting the order",
      success: false,
      error,
    });
  }
};

// exports.updateOrder = (req, res) => {
//   const data = [req.body.quantity, req.params.id];
//   dairyMilkModal.updateOrder(data, (err, result) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).send({
//         message: "Error in Updating Order",
//         err,
//       });
//     }
//     return res.status(200).send({
//       message: "Successfully Updated Order ",
//       success: true,
//       result,
//     });
//   });
// };

// exports.updateOrderStatus = (req, res) => {
//   const data = [req.body.status, req.params.id];
//   console.log(data);
//   dairyMilkModal.updateOrderStatus(data, (err, result) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).send({
//         message: "Error in Updating Order Status",
//         err,
//       });
//     }
//     return res.status(200).send({
//       message: "Successfully Updated Order  Status",
//       success: true,
//       result,
//     });
//   });
// };

// exports.getCapacityByDate = (req, res) => {
//   const data = req.params.date;
//   const maxCapacity = 180;
//   dairyMilkModal.getCapacity(data, (err, result) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).send({
//         message: "Error in Getting Capacity",
//         err,
//       });
//     }

//     let Capacity = maxCapacity - Number(result[0][`sum(quantity)`]);
//     return res.status(200).send({
//       message: "Successfully Got capacity Order  Status",
//       success: true,
//       date: data,
//       Capacity: `${Capacity} Liters remaining`,
//     });
//   });
// };
