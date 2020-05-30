const router = require("express").Router();
let Comment = require("../models/Comment");

router.post("/saveComment", (req, res) => {
  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    if (err) return res.json({ success: false, err });

    Comment.find({ _id: comment._id }).exec((err, result) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({ success: true, result });
    });
  });
});

router.post("/getComment", (req, res) => {
  Comment.find({ productID: req.body.productId }).exec((err, comments) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, comments });
  });
});

module.exports = router;
