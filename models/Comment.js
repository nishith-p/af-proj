const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: false,
    },
    productID: {
      type: Schema.Types.ObjectID,
      ref: "Product",
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
