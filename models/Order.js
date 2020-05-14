const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
