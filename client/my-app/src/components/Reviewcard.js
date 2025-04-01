import { useState } from "react";
import "./Reviewcard.css";
import { Link } from "react-router-dom";

const Reviewcard = ({ id, name, location, reviewText,rating, image,user,facilities}) => {
	
	return (

		<Link to={`/review/${id}`}className="reviewcard">
		
			<img src={image.url}  alt="pgpic" className="hostel-img" />
       
		
			<div className="reviewcontent">
				<div className="nameadd">
					<h2>{name}</h2>
					<p className="location">{ location}</p>
				</div>
				<p className="review-text">
					{reviewText}
				</p>
				<div className="reviewlike">
					<p className="rating">⭐ Rating: { rating}/5</p>
					<div className="review-actions">
						<button className="like-btn">👍 12</button>
						<button className="dislike-btn">👎 2</button>
					</div>
				</div>
				<p className="author-name">
					Reviewed by: <strong>{ user}</strong>
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
		</Link>
	);
};

export default Reviewcard;
