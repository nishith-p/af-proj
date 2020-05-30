const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Payment = require("../models/Payment");

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

//REGISTER
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

//LOGIN
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

//LOGOUT
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

//AUTH CHECK
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

//ADMIN CHECK
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

//GET MANAGERS
userRouter.get(
  "/getManagers",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find({ role: "manager" })
      .then((users) => res.json(users))
      .catch((err) => res.status(400).json("Error: " + err));
  }
);

//GET USERS
userRouter.get(
  "/getUsers",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find({ role: "user" })
      .then((users) => res.json(users))
      .catch((err) => res.status(400).json("Error: " + err));
  }
);

//UPDATE USERS
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

//DELETE USERS
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

/**
 *
 * CART ROUTES
 *
 */

//GET CART
userRouter.get(
  "/getCart",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id })
      .then((user) => res.json(user.cart))
      .catch((err) => res.status(400).json("Error: " + err));
  }
);

//ADD TO CART
userRouter.post(
  "/addtocart",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find({ _id: req.user._id }, (err, userInfo) => {
      let duplicate = false;

      req.user.cart.forEach((item) => {
        if (item.id == req.query.productId) {
          duplicate = true;
        }
      });

      if (duplicate) {
        User.findOneAndUpdate(
          { _id: req.user._id, "cart.id": req.query.productId },
          { $inc: { "cart.$.quantity": 1 } },
          { new: true },
          (err, userInfo) => {
            if (err) return res.json({ success: false, err });
            res.status(200).json(userInfo.cart);
          }
        );
      } else {
        User.findOneAndUpdate(
          { _id: req.user._id },
          {
            $push: {
              cart: {
                id: req.query.productId,
                quantity: 1,
                date: Date.now(),
              },
            },
          },
          { new: true },
          (err, userInfo) => {
            if (err) return res.json({ success: false, err });
            res.status(200).json(userInfo.cart);
          }
        );
      }
    });
  }
);

//REMOVE FROM CART
userRouter.get(
  "/removeFromCart",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { cart: { id: req.query._id } } },
      { new: true },
      (err, userInfo) => {
        //error might occur
        let cart = req.user.cart;
        let array = cart.map((item) => {
          return item.id;
        });

        Product.find({ _id: { $in: array } })
          .populate("writer")
          .exec((err, cartDetail) => {
            return res.status(200).json({
              cartDetail,
              cart,
            });
          });
      }
    );
  }
);

/**
 *
 * WISHLIST ROUTES
 *
 */

//GET WISHLIST
userRouter.get(
  "/getwish",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id })
      .then((user) => res.json(user.wishlist))
      .catch((err) => res.status(400).json("Error: " + err));
  }
);

//ADD TO WISHLIST
userRouter.post(
  "/addtowish",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find({ _id: req.user._id }, (err, userInfo) => {
      let duplicate = false;

      req.user.wishlist.forEach((item) => {
        if (item.id == req.query.productId) {
          duplicate = true;
        }
      });

      if (duplicate) {
        User.findOneAndUpdate(
          { _id: req.user._id, "wishlist.id": req.query.productId },
          { $inc: { "wishlist.$.quantity": 1 } },
          { new: true },
          (err, userInfo) => {
            if (err) return res.json({ success: false, err });
            res.status(200).json(userInfo.wishlist);
          }
        );
      } else {
        User.findOneAndUpdate(
          { _id: req.user._id },
          {
            $push: {
              wishlist: {
                id: req.query.productId,
                quantity: 1,
                date: Date.now(),
              },
            },
          },
          { new: true },
          (err, userInfo) => {
            if (err) return res.json({ success: false, err });
            res.status(200).json(userInfo.wishlist);
          }
        );
      }
    });
  }
);

//REMOVE FROM WISHLIST
userRouter.get(
  "/removeFromWish",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { wishlist: { id: req.query._id } } },
      { new: true },
      (err, userInfo) => {
        //error might occur
        let wishlist = req.user.wishlist;
        let array = wishlist.map((item) => {
          return item.id;
        });

        Product.find({ _id: { $in: array } })
          .populate("writer")
          .exec((err, wishlistDetail) => {
            return res.status(200).json({
              wishlistDetail,
              wishlist,
            });
          });
      }
    );
  }
);

/**
 *
 * PAYMENT ROUTES
 *
 */

//MAKE PAYMENT
userRouter.post(
  "/addorder",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const payment = new Payment(req.body);
    payment.save((err) => {
      if (err)
        res.status(500).json({
          message: { msgBody: "Error occured", msgError: true },
        });
      else {
        req.user.payments.push(payment);
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

//DISPLAY PAYMENTS
userRouter.get(
  "/orders",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id })
      .populate("payments")
      .exec((err, document) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error has occured", msgError: true },
          });
        else {
          res
            .status(200)
            .json({ payments: document.payments, authenticated: true });
        }
      });
  }
);

module.exports = userRouter;
