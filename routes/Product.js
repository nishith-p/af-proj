const express = require("express");
const productRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const Category = require("../models/Category");
const Subcat = require("../models/Subcat");
const Product = require("../models/Product");

productRouter.get(
  "/view",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.find()
      .then((products) => res.json(products))
      .catch((err) => res.status(400).json("Error: " + err));
  }
);

/*productRouter.post(
    "/add",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const product = new Product(req.body);
      product.save((err) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error occured", msgError: true },
          });
        else {
          req.Category.orders.push(product);
          req.Category.save((err) => {
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
  );*/

productRouter.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const product = new Product(req.body);
    product.save((err) => {
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

productRouter.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err, data) => {
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

productRouter.post(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.findById(req.params.id)
      .then((product) => {
        Product.name = req.body.name;
        Product.save((err) => {
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

module.exports = productRouter;
