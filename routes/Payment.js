const express = require("express");
const paymentRouter = express.Router();
const User = require("../models/User");
const Product = require("../models/Product");
const passport = require("passport");
const Payment = require("../models/Payment");

paymentRouter.get("/view", (req, res) => {
  Payment.find().exec((err, payments) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, payments });
  });
});

paymentRouter.post(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Payment.findById(req.params.id)
      .then((payment) => {
        payment.status = req.body.status;
        payment.save((err) => {
          if (err)
            res.status(500).json({
              message: { msgBody: "Error occured", msgError: true },
            });
          else {
            res.status(200).json({
              message: {
                message: { msgBody: "Successfully added.", msgError: false },
              },
            });
          }
        });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }
);

paymentRouter.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Payment.findByIdAndDelete(req.params.id, (err, data) => {
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

module.exports = paymentRouter;
