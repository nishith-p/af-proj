const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const { connect } = require("mongoose");
const { success, error } = require("consola");
const passport = require("passport");
const { DB, PORT } = require("./config");

//App Initialization
const app = express();

//Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

require("./middleware/passport")(passport);

//User Router
app.use("/api/users", require("./routes/users"));

const startApp = async () => {
  try {
    //DB Connection
    await connect(DB, {
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    success({
      message: `Successfully connected`,
      badge: true,
    });

    //Port Listening
    app.listen(PORT, () =>
      success({ message: `Server started on PORT ${PORT}`, badge: true })
    );
  } catch (err) {
    error({ message: `Unable to connect`, badge: true });
  }
};

startApp();
