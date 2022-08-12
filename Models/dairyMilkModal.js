const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    emailID: {
      type: String,
      trim: true,
      required: true,
    },
    customerName: {
      type: String,
      trim: true,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const milkStock = new Schema(
  {
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

const order = mongoose.model("order", orderSchema);

const milkFactory = mongoose.model("MilkDairy", milkStock);

module.exports = { order, milkFactory };
