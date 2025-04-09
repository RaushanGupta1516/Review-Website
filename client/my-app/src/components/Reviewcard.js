import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "./Reviewcard.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
const Reviewcard = ({
	id,
	name,
	location,
	reviewText,
	rating,
	image,
	facilities,
	likes = [],
}) => {
	const [likeCount, setLikeCount] = useState(likes.length || 0);
	const [liked, setLiked] = useState(false);
	const [isLiking, setIsLiking] = useState(false);
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const decoded = jwtDecode(token);
				setUserId(decoded.id);
				if (Array.isArray(likes)) {
					setLiked(likes.includes(decoded.id));
					setLikeCount(likes.length);
				}
			} catch (err) {
				console.error("Invalid token:", err);
				localStorage.removeItem("token");
				setUserId(null);
			}
		}
	}, [likes]);

	const handleLikeClick = async () => {
		const token = localStorage.getItem("token");

		if (!token || !userId) {
			toast.error("Please log in to like the review.");
			console.warn("Like blocked: missing user or token", { userId, token });
			return;
		}

		setIsLiking(true);
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_BASE_URL}/review/like/${id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			const data = await response.json();

			if (response.ok && data.success) {
				setLiked((prevLiked) => {
					setLikeCount((prevCount) =>
						prevLiked ? prevCount - 1 : prevCount + 1
					);
					return !prevLiked;
				});
			} else {
				console.error("Server error:", data.message);
				alert(data.message || "Unable to like the review.");
			}
		} catch (error) {
			console.error("Error liking review:", error);
			alert("Something went wrong. Please try again.");
		} finally {
			setIsLiking(false);
		}
	};

	return (
		<div className="reviewcard">
			<Link to={`/review/${id}`} className="reviewcard-link">
			<div>
				<img
					src={image?.url || "/default-image.jpg"}
					alt="pgpic"
					className="hostel-img"
				/>
			</div>
			</Link>
			<div className="reviewcontent">
				<div className="nameadd">
					<h2>{name}</h2>
					<p className="location">{location}</p>
				</div>

				<p className="review-text">{reviewText}</p>

				<div className="reviewlike">
					<p className="rating">⭐ Rating: {rating}/5</p>

					<div className="review-actions">
						<button
							className={`like-btn ${liked ? "liked" : ""}`}
							onClick={handleLikeClick}
							disabled={isLiking}
						>
							👍 {likeCount}
						</button>
					</div>
				</div>

				<p className="author-name">
					Reviewed by: <strong>{name || "Anonymous"}</strong>
				</p>

				<div className="tags">
					{facilities?.length > 0 ? (
						facilities.map((facility, index) => (
							<span key={index} className="tag">
								{facility}
							</span>
						))
					) : (
						<span className="tag">No facilities mentioned</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default Reviewcard;
