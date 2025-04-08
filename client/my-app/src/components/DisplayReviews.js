import React, { useContext } from "react";
import { StoreContext } from "../StoreContext";
import "./DisplayReviews.css"; 
import Reviewcard from "./Reviewcard";

const DisplayReviews = () => {
	const { review_list, loggedInUser } = useContext(StoreContext); // ✅ one call to useContext

	return (
		<div className="display-reviews-container">
			<h1 className="reviews-title">All Reviews</h1>

			<div className="grid-container">
				{review_list?.map((item, index) => (
					<Reviewcard
						key={index}
						id={item._id}
						name={item.name}
						location={item.location}
						reviewText={item.reviewText}
						rating={item.rating}
						image={item.image}
						user={loggedInUser} 
						facilities={item.facilities}
						likes={item.likes}
					/>
				))}
			</div>
		</div>
	);
};

export default DisplayReviews;
