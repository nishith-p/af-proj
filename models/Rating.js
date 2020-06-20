const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RatingSchema = mongoose.Schema(
    {
        rating: {
            type: Number,
            required: false,
        },
        productID: {
            type: Schema.Types.ObjectID,
            ref: "Product",
        },
    },
    { timestamps: true }
);

const Rating = mongoose.model("Rating", RatingSchema);
module.exports = Rating;
