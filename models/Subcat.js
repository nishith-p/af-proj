const mongoose = require("mongoose");

const SubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

module.exports = mongoose.model("Subcat", SubcategorySchema);
