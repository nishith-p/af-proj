const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    payments: {
      type: Array,
      default: [],
    },
    total: {
      type: Number,
    },
    status: {
      type: String,
      default: "processing",
      enum: ["processing", "shipped", "cancelled", "completed"],
      required: true,
    },
    method: {
      type: String,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
