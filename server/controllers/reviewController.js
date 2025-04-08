const Review = require("../models/reviewModel");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
	cloud_name: process.env.CLOUDNAME,
	api_key: process.env.APIKEY,
	api_secret: process.env.APISECRET,
});



module.exports.getReviewData = async (req, res) => {
	try {
		let allReview = await Review.find({});
		res.json({ succss: true, data: allReview });
	} catch (error) {
		res.json({ success: false, message: "EROOORRRRRR-------------" });
	}
};



module.exports.addReview = async (req, res) => {
	try {
		console.log("Request Body:", req.body);
		const file = req.files.image;

		console.log("Uploaded Files:", file);

		const uploadResult = await cloudinary.uploader.upload(file.tempFilePath);


		const facilities = Array.isArray(req.body["facilities[]"])
			? req.body["facilities[]"]
			: [req.body["facilities[]"]].filter(Boolean);


		const facilitiesRating = {
			cleanliness: Number(req.body["facilitiesRating[cleanliness]"]) || 0,
			food: Number(req.body["facilitiesRating[food]"]) || 0,
			security: Number(req.body["facilitiesRating[security]"]) || 0,
			internet: Number(req.body["facilitiesRating[internet]"]) || 0,
		};

		const newReview = new Review({
			name: req.body.name,
			location: req.body.location,
			reviewText: req.body.reviewText,
			rating: req.body.rating,
			image: {
				url: uploadResult.url,
				filename: uploadResult.original_filename,
			},
			user: req.body.userid,
			priceRange: req.body.priceRange,
			roomType: req.body.roomType,
			facilities: facilities,
			pgType: req.body.pgType,
			preferredTenant: req.body.preferredTenant,
			facilitiesRating: facilitiesRating,
		});

		await newReview.save();

		res.status(201).json({
			success: true,
			message: "Review added successfully!",
			review: newReview,
		});
	} catch (error) {
		console.error("Error adding review:", error);
		res.status(500).json({
			success: false,
			message: "Error occurred while saving the review.",
		});
	}
};

module.exports.showReview = async (req, res) => {
	try {
		const review = await Review.findById(req.params.id);
		if (!review) {
			return res.status(404).json({ message: "Review not found" });
		}
		res.json(review);
	} catch (error) {
		res.status(500).json({ message: "Error fetching review details", error });
	}
};

module.exports.deleteReview = async (req, res) => {
	try {
		const reviewId = req.params.id;
		const review = await Review.findById(reviewId);

		if (!review) {
			return res.status(404).json({ message: "Review not found" });
		}

		await Review.findByIdAndDelete(reviewId);
		res.json({ success: true, message: "Review deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Error deleting review", error });
	}
}
module.exports.updateReview = async (req, res) => {
	try {
		const reviewId = req.params.id;
		const updatedData = req.body;

		const updatedReview = await Review.findByIdAndUpdate(reviewId, updatedData, {
			new: true,
		});

		if (!updatedReview) {
			return res.status(404).json({ message: "Review not found" });
		}

		res.json({ success: true, review: updatedReview });
	} catch (error) {
		res.status(500).json({ message: "Error updating review", error });
	}
};
module.exports.likeReview = async (req, res) => {
	try {
		const userId = req.user.id;
		const reviewId = req.params.id;

		if (!userId) {
			return res.status(401).json({ success: false, message: "User not logged in" });
		}

		const review = await Review.findById(reviewId);
		if (!review) {
			return res.status(404).json({ success: false, message: "Review not found" });
		}

		const alreadyLiked = review.likes.includes(userId);

		if (alreadyLiked) {
			review.likes.pull(userId); 
		} else {
			review.likes.push(userId); 
		}

		await review.save();

		res.json({
			success: true,
			message: alreadyLiked ? "Review unliked" : "Review liked",
			liked: !alreadyLiked,
			totalLikes: review.likes.length,
		});
	} catch (error) {
		console.error("Error in likeReview:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

