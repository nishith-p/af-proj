const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const Order = require("../models/Order");

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "SECRET",
      sub: userID,
    },
    "SECRET",
    { expiresIn: "1 day" }
  );
};

userRouter.post("/register", (req, res) => {
  const { name, username, password, role } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err)
      res.status(500).json({
        message: { msgBody: "Error occured", msgError: true },
      });
    if (user)
      res.status(400).json({
        message: { msgBody: "Email is already taken", msgError: true },
      });
    else {
      const newUser = new User({ name, username, password, role });
      newUser.save((err) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error occured", msgError: true },
          });
        else
          res.status(201).json({
            message: {
              msgBody: "Account successfully created.",
              msgError: false,
            },
          });
      });
    }
  });
});

userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, role } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
  }
);

userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { username: "", role: "" }, success: true });
  }
);

userRouter.post(
  "/order",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const order = new Order(req.body);
    order.save((err) => {
      if (err)
        res.status(500).json({
          message: { msgBody: "Error occured", msgError: true },
        });
      else {
        req.user.orders.push(order);
        req.user.save((err) => {
          if (err)
            res.status(500).json({
              message: { msgBody: "Error occured", msgError: true },
            });
          else
            res.status(200).json({
              message: {
                message: { msgBody: "Successfully added.", msgError: false },
              },
            });
        });
      }
    });
  }
);

userRouter.get(
  "/orders",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id })
      .populate("orders")
      .exec((err, document) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error has occured", msgError: true },
          });
        else {
          res
            .status(200)
            .json({ orders: document.orders, authenticated: true });
        }
      });
  }
);

userRouter.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "admin") {
      res
        .status(200)
        .json({ message: { msgBody: "You are an admin.", msgError: false } });
    } else {
      res.status(403).json({
        message: { msgBody: "You are unauthorized.", msgError: true },
      });
    }
  }
);

userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { _id, username, role, name } = req.user;
    res.status(200).json({
      isAuthenticated: true,
      user: { _id, username, role, name },
    });
  }
);

userRouter.get(
  "/getManagers",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find({ role: "manager" })
      .then((users) => res.json(users))
      .catch((err) => res.status(400).json("Error: " + err));
  }
);

userRouter.get(
  "/getUsers",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find({ role: "user" })
      .then((users) => res.json(users))
      .catch((err) => res.status(400).json("Error: " + err));
  }
);

userRouter.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findByIdAndDelete(req.params.id, (err, data) => {
      if (err)
        res.status(500).json({
          message: { msgBody: "Error occured", msgError: true },
        });
      else {
        res.status(200).json({
          message: {
            message: { msgBody: "Successfully deleted.", msgError: false },
          },
        });
      }
    });
  }
);

userRouter.post(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.params.id)
      .then((User) => {
        User.name = req.body.name;
        User.username = req.body.username;
        User.save((err) => {
          if (err)
            res.status(500).json({
              message: { msgBody: "Error occured", msgError: true },
            });
          else {
            res.status(200).json({
              message: {
                message: { msgBody: "Successfully updated. ", msgError: false },
              },
            });
          }
        });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }
);

module.exports = userRouter;
