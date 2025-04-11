import React, { useContext } from "react";
import { StoreContext } from "../StoreContext";
import "./DisplayReviews.css";
import Reviewcard from "./Reviewcard";

const DisplayReviews = () => {
	const { review_list } = useContext(StoreContext);

	return (
		<div className="display-reviews-container">
			<h1 className="reviews-title">All Reviews</h1>

			<div className="grid-container">
				{review_list?.map((item, index) => (
					<Reviewcard
						key={index}
						id={item._id}
						placeName={item.name}                     // 🏠 PG/hostel name
						reviewerName={item.user?.name || "Anonymous"} // 👤 user name
						reviewerId={item.user?._id}              // 🆔 to highlight "you"
						location={item.location}
						reviewText={item.reviewText}
						rating={item.rating}
						image={item.image}
						facilities={item.facilities}
						likes={item.likes}
					/>
				))}
			</div>
		</div>
	);
};

export default DisplayReviews;
