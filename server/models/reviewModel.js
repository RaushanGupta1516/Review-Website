const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
	name: { type: String, required: true },
	location: { type: String, required: true },

	reviewText: { type: String, required: true },
	rating: { type: Number, required: true, min: 0, max: 5 },
	image: {
		url: String,
		filename: String,
	},
	user: { type: String, required: true },

	priceRange: { type: String, required: false },

	roomType: {
		type: String,
		required: false,
		enum: ["Single", "Double", "Triple", "Shared"],
	},
	facilities: { type: [String], default: [] },

	pgType: { type: String, required: false, enum: ["Male", "Female", "Co-ed"] },
	preferredTenant: {
		type: String,
		required: false,
		enum: ["Students", "Working Professionals", "Both"],
	},

	facilitiesRating: {
		cleanliness: { type: Number, min: 0, max: 5 },
		food: { type: Number, min: 0, max: 5 },
		security: { type: Number, min: 0, max: 5 },
		internet: { type: Number, min: 0, max: 5 },
	},
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
