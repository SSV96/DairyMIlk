const { order, Inventory } = require("../Models/dairyMilkModal");
const {
  HandleSuccess,
  handleError,
} = require("../ErrorHandlers/handlerrorSuccess");
const statusCodes = require("../ErrorHandlers/http-status-codes");
// To Place order
exports.placeOrder = async (req, res) => {
  const data = req.body;
  let message;
  try {
    const MilkStock = await Inventory.findOne({ Stock: "Milk" });
    console.log(MilkStock.Current_Quantity, "  < ", data.Quantity);
    const checkOutOfStock = MilkStock.Current_Quantity < data.Quantity;
    console.log(checkOutOfStock, "checking");
    if (checkOutOfStock) {
      message = "Out of Stock";
      console.log(message);
      return HandleSuccess(res, statusCodes.OK, message);
    }
    data.status = "Accepted";
    UpdateStock(-data.Quantity);
    const New_order = new order(data);
    const result = await New_order.save();
    console.log(data);
    message = "Order has been Placed Successfully";
    return HandleSuccess(res, statusCodes.OK, message, result);
  } catch (error) {
    message = "Something went wrong";
    return handleError(res, statusCodes.INTERNAL_SERVER, message, error);
  }
};

//To Delete Order
exports.deleteOrder = async (req, res) => {
  const data = req.params.id;
  let message;
  try {
    let status;
    const orderDetails = await order.findOne({ _id: data });
    console.log(orderDetails, "got Order details");
    if (!orderDetails) {
      message = "There is no Order associated with this ID";
    } else {
      status = await order.deleteOne({ _id: data });
      console.log("here", orderDetails.Quantity);
      UpdateStock(orderDetails.Quantity);
      message = "Order has been deleted Successfully";
      console.log(status, "status");
    }

    return HandleSuccess(res, statusCodes.OK, message, status);
  } catch (error) {
    message = "Something went wrong in deleting the order";
    return handleError(res, statusCodes.INTERNAL_SERVER, message, error);
  }
};

//To Update Order

exports.updateOrder = async (req, res) => {
  const data = req.params.id;
  const quantity = req.body.Quantity;
  let message;
  try {
    const status = await order.updateOne(
      { _id: data },
      { $set: { Quantity: quantity } }
    );
    if (!status) {
      message = "Order not Found";
      return HandleSuccess(res, statusCodes.OK, message);
    }
    console.log(status);
    return HandleSuccess(res, statusCodes.OK, message, status);
  } catch (error) {
    message = "Something Went Wrong";
    return handleError(res, statusCodes.INTERNAL_SERVER, message, error);
  }
};

// To Update Order Status
exports.updateOrderStatus = async (req, res) => {
  const data = req.params.id;
  const status = req.body.Status;
  let message;
  try {
    const Updatedstatus = await order.updateOne(
      { _id: data },
      { $set: { Status: status } }
    );
    message = "Order Updated Successfully";
    if (!status) {
      message = "Order not Found";
    }
    console.log(status);
    return HandleSuccess(res, statusCodes.OK, message, Updatedstatus);
  } catch (error) {
    message = "Something Went Wrong";
    return handleError(res, statusCodes.INTERNAL_SERVER, message, error);
  }
};
const UpdateStock = async (demand) => {
  const Stocks = await Inventory.findOne({ Stock: "Milk" });
  console.log(Stocks);
  const UpdateStatus = Inventory.updateOne(
    { Stock: "Milk" },
    { $set: { Current_Quantity: Stocks.Current_Quantity + demand } }
  );
  return UpdateStatus;
};

exports.getCapacityByDate = async (req, res) => {
  const date = req.params.date;
};
exports.addStock = async (req, res) => {
  const data = req.params;
  let message;
  try {
    const New_Stock = new Inventory(data);

    const result = await New_Stock.save();
    message = "Sucessfully Added Stock to the Inventory ";
    return HandleSuccess(res, statusCodes.OK, message, result);
  } catch (err) {
    message = "Something went Wrong";
    return handleError(res, statusCodes.INTERNAL_SERVER, message, err);
  }
};

//To Update the Stock if you want to increse the stock you use positive values else use negative values

exports.updateQuantity = async (req, res) => {
  const data = req.params;
  console.log("from ddata", data);
  let message;
  try {
    const CurrentQuantity = await Inventory.findOne({ Stock: data.Stock });
    console.log(CurrentQuantity);
    const total = Number(CurrentQuantity.Quantity) + Number(data.Quantity);
    // const total = 0;
    if (total < 0) {
      message = "Invalid data  ";
      return HandleSuccess(res, statusCodes.OK, message);
    }

    console.log(
      "current stock = ",
      CurrentQuantity.Quantity,
      "Added Stock =",
      data.Quantity,
      "Total =",
      total
    );
    const updateQuantity = await Inventory.updateOne(
      { Stock: data.Stock },
      { $set: { Quantity: total } }
    );
    message = "Quantity Updated SuccessFully and Current capacity";
    return HandleSuccess(res, statusCodes.OK, message, updateQuantity);
  } catch (err) {
    message = "Something Went Wrong";
    return handleError(res, statusCodes.INTERNAL_SERVER, message, err);
  }
};
