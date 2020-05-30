const express = require("express");
const categoryRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const Category = require("../models/Category");
const Subcat = require("../models/Subcat");

categoryRouter.get("/view", (req, res) => {
  Category.find()
    .then((categories) => res.json(categories))
    .catch((err) => res.status(400).json("Error: " + err));
});

//AXIOS
categoryRouter.get("/views", (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, categories });
  });
});

categoryRouter.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const category = new Category(req.body);
    category.save((err) => {
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
  }
);

categoryRouter.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Category.findByIdAndDelete(req.params.id, (err, data) => {
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

categoryRouter.post(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Category.findById(req.params.id)
      .then((category) => {
        category.name = req.body.name;
        category.save((err) => {
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

module.exports = categoryRouter;
