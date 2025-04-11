const Comment = require("../models/commentModel")
const Review =require("../models/reviewModel")


module.exports.getComments = async (req, res) => {
	try {
		const { id } = req.params; 
		const comments = await Comment.find({ review: id });
		res.json({ success: true, comments });
	} catch (error) {
		console.error("Error fetching comments:", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

module.exports.addComment = async (req, res) => {
	try {
		const { id } = req.params; 
		const { content } = req.body;

	
		const review = await Review.findById(id);
		if (!review) {
			return res.status(404).json({ success: false, message: "Review not found" });
		}

		const newComment = new Comment({
			review: id,
			user: req.body.userid,
			content: content,
		});

		await newComment.save();
		res.status(201).json({ success: true, comment: newComment });
	} catch (error) {
		console.error("Error posting comment:", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

module.exports.updateComment = async (req, res) => {
	try {
		const comment = await Comment.findById(req.params.commentId);
		if (!comment) return res.status(404).json({ message: "Comment not found" });

		if (comment.user.toString() !== req.body.userid) {
			return res.status(403).json({ message: "Unauthorized" });
		}

		comment.content = req.body.content;
		await comment.save();

		res.status(200).json({ message: "Comment updated", comment });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

module.exports.deleteComment = async (req, res) => {
	try {
		const comment = await Comment.findById(req.params.commentId);
		if (!comment) return res.status(404).json({ message: "Comment not found" });

		if (comment.user.toString() !== req.body.userid) {
			return res.status(403).json({ message: "Unauthorized" });
		}

		await Comment.findByIdAndDelete(req.params.commentId);
		res.status(200).json({ message: "Comment deleted" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};
