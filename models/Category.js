const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  subcats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subcat" }],
});

module.exports = mongoose.model("Category", CategorySchema);
