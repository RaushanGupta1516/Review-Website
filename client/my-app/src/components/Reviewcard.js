import { useState } from "react";
import "./Reviewcard.css";
import { Link } from "react-router-dom";

const Reviewcard = ({ id, name, location, reviewText, rating, image, user, facilities }) => {
	const [likeCount, setLikeCount] = useState(1);
	const [liked, setLiked] = useState(false);

	const handleLikeClick = () => {
		setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
		setLiked(!liked);
	};

	return (
		<div className="reviewcard">
			<img src={image.url} alt="pgpic" className="hostel-img" />

			<div className="reviewcontent">
				<div className="nameadd">
					<h2>{name}</h2>
					<p className="location">{location}</p>
				</div>
				<p className="review-text">{reviewText}</p>
				<div className="reviewlike">
					<p className="rating">⭐ Rating: {rating}/5</p>
					<div className="review-actions">
						<button className="like-btn" onClick={handleLikeClick}>
							👍 {likeCount}
						</button>
					</div>
				</div>
				<p className="author-name">
					Reviewed by: <strong>{name ? name : "Anonymous"}</strong> 
				</p>

				<div className="tags">
					{facilities && facilities.length > 0 ? (
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
