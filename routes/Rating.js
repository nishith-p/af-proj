const router = require("express").Router();
let Rating = require("../models/Rating");

router.post("/saveRating", (req, res) => {
    const rating = new Rating(req.body);

    rating.save((err, rating) => {
        if (err) return res.json({ success: false, err });

        Rating.find({ _id: rating._id }).exec((err, result) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({ success: true, result });
        });
    });
});

router.post("/getRating", (req, res) => {
    Rating.find({ productID: req.body.productId }).exec((err, ratings) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({ success: true, ratings });
    });
});

module.exports = router;
