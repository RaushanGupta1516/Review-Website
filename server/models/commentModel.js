
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
	review: { type: mongoose.Schema.Types.ObjectId, ref: "Review", required: true },
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	content: { type: String, required: true },
	
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
