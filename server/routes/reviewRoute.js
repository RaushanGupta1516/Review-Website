

const express = require("express");
const router = express.Router({ mergeParams: true });
const { isverified } = require("../middleware");
const reviewController = require("../controllers/reviewController");


router.get("/", reviewController.getReviewData);

router.post("/", isverified, reviewController.addReview);

router.get("/:id", reviewController.showReview);



module.exports = router;
