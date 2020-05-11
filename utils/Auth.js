const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");
const passport = require("passport");

const userRegister = async (userDets, roles, res) => {
  try {
    //Validate the UserName function
    let userNameNotTaken = await validateUserName(userDets.username);
    if (!userNameNotTaken) {
      return res.status(400).json({
        message: `Username is already taken.`,
        success: false,
      });
    }

    //Validate the Email
    let userEmailNotTaken = await validateEmail(userDets.email);
    if (!userEmailNotTaken) {
      return res.status(400).json({
        message: `Email is already taken.`,
        success: false,
      });
    }

    //Hash Password
    const hashedPassword = await bcrypt.hash(userDets.password, 12);

    //Create User
    const newUser = new User({
      ...userDets,
      password: hashedPassword,
      roles,
    });
    await newUser.save();
    return res.status(201).json({
      message: "User created.",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: `${err}`,
      success: false,
    });
  }
};

const userLogin = async (userCreds, roles, res) => {
  let { username, password } = userCreds;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({
      message: "Username not found. ",
      success: false,
    });
  }

  if (user.roles != roles) {
    return res.status(400).json({
      message: "Are you lost?",
      success: false,
    });
  }

  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    let token = jwt.sign(
      {
        user_id: user._id,
        roles: user.roles,
        username: user.username,
        email: user.email,
      },
      SECRET,
      { expiresIn: "7 days" }
    );
    let result = {
      username: user.username,
      roles: user.roles,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168,
    };
    return res.status(200).json({
      ...result,
      message: "Successfully logged in.",
      success: true,
    });
  } else {
    return res.status(400).json({
      message: "Incorrect Password.",
      success: false,
    });
  }
};

const validateUserName = async (username) => {
  let user = await User.findOne({ username });
  return user ? false : true;
};

const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

const userAuth = passport.authenticate("jwt", { session: false });

const serializeUser = (user) => {
  return {
    username: user.username,
    email: user.email,
    _id: user._id,
    name: user.name,
    roles: user.roles,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt,
  };
};

const checkRole = (roles) => (req, res, next) => {
  if (roles.includes(req.user.roles)) {
    return next();
  }
  return res.status(401).json({
    message: "Unauthorized.",
    success: false,
  });
};

module.exports = {
  userRegister,
  userLogin,
  userAuth,
  serializeUser,
  checkRole,
};
