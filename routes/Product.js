const express = require("express");
const mongoose = require("mongoose");
const productRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const Product = require("../models/Product");
const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png") {
      return cb(res.status(400).end("Only JPG and PNG are allowed."), false);
    }
    cb(null, true);
  },
});

let upload = multer({ storage: storage }).single("file");

//AXIOS
productRouter.get("/views", (req, res) => {
  Product.find().exec((err, products) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, products });
  });
});

productRouter.post("/viewm", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);

  let findArgs = {};
  let term = req.body.searchTerm;
  console.log(term);

  for (let key in req.body.filters) {
    //console.log(key)

    if (req.body.filters[key].length > 0) {
      // if (key === "price") {
      //     findArgs[key] = {
      //         $gte: req.body.filters[key][0],
      //         $lte: req.body.filters[key][1]
      //     }
      // }
      // else {
      findArgs[key] = req.body.filters[key];
      //console.log(req.body.filters[key])
      // }
    }
  }

  if (term) {
    Product.find(findArgs)
      .find({ $text: { $search: term } })
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err });
        res
          .status(200)
          .json({ success: true, products, postSize: products.length });
      });
  } else {
    Product.find(findArgs)
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err });
        res
          .status(200)
          .json({ success: true, products, postSize: products.length });
      });
  }

  // Product.find()
  //   .sort([[sortBy, order]])
  //   .skip(skip)
  //   .limit(limit)
  //   .exec((err, products) => {
  //     if (err) return res.status(400).json({ success: false, err });
  //     res.status(200).json({ success: true, products });
  //   });
});

//AXIOS
productRouter.post(
  "/adds",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.create(req.body)
      .then(() => res.json("Product added"))
      .catch((err) => res.status(400).json("Error: " + err));
  }
);

//AXIOS
productRouter.post(
  "/upload",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const product = new Product(req.body);
    upload(req, res, (err) => {
      if (err) return res.json({ success: false, err });
      return res.json({
        success: true,
        image: res.req.file.path,
        fileName: res.req.file.filename,
      });
    });
  }
);

//AXIOS
productRouter.delete(
  "/deletes/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.findByIdAndDelete(req.params.id)
      .then(() => res.json("Product deleted"))
      .catch((err) => res.status(400).json("Error: " + err));
  }
);

//AXIOS
productRouter.get("/products_by_id", (req, res) => {
  let type = req.query.type;
  let productIds = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    productIds = [];
    productIds = ids.map((item) => {
      return item;
    });
  }

  Product.find({ _id: { $in: productIds } })
    .populate("writer")
    .exec((err, product) => {
      if (err) return req.status(400).send(err);
      return res.status(200).send(product);
    });
});

productRouter.route("/:id").get((req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json("Error: " + err));
});

productRouter.post(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.findById(req.params.id)
      .then((product) => {
        product.title = req.body.title;
        product.category = req.body.category;
        product.desc = req.body.desc;
        product.image = req.body.image;
        product.price = req.body.price;
        product.discount = req.body.discount;
        product.dprice = req.body.dprice;
        product.quantity = req.body.quantity;
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
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }
);

module.exports = productRouter;
