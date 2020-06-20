const express = require("express");
var cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { DB } = require("./config");
const path = require("path");

const PORT = process.env.PORT || 8080;

app.use(cookieParser());
app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.MONGODB_URI || DB,
  {
    useFindAndModify: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => {
    console.log("MongoDB connected.");
  }
);

const userRouter = require("./routes/User");
app.use("/user", userRouter);

const categoryRouter = require("./routes/Category");
app.use("/category", categoryRouter);

const productRouter = require("./routes/Product");
app.use("/product", productRouter);

const reviewRouter = require("./routes/Comment");
app.use("/comment", reviewRouter);

const ratingRouter = require("./routes/Rating");
app.use("/rating", ratingRouter);

const paymentRouter = require("./routes/Payment");
app.use("/payment", paymentRouter);

app.use("/uploads", express.static("uploads"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Express server started.");
});
