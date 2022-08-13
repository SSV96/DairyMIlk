const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    EmailID: {
      type: String,
      trim: true,
      required: true,
    },
    CustomerName: {
      type: String,
      trim: true,
      required: true,
    },
    Quantity: {
      type: Number,
      required: true,
    },
    Status: {
      type: String,
    },
  },
  { timestamps: true }
);

const InventorySchema = new Schema(
  {
    Stock: { type: String, required: true, unique: true },
    Current_Quantity: { type: Number, default: 0 },
    Max_Quantity: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const order = mongoose.model("order", orderSchema);

const Inventory = mongoose.model("Inventory", InventorySchema);

module.exports = { order, Inventory };
