const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { DB, PORT } = require("./config");

app.use(cookieParser());
app.use(express.json());

mongoose.connect(
  DB,
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

app.listen(PORT, () => {
  console.log("Express server started.");
});
