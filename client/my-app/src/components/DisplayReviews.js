

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
        {review_list.map((item, index) => {
           return (
              <Reviewcard
                key={index}
                id={item._id}
                name={item.name}
                location={item.location}
                reviewText={item.reviewText}
                rating={item.rating}
                image={item.image}
                user={item.user}
                facilities={item.facilities}
              />
            );
          
        })}
      </div>

   
    </div>
  );
};

export default DisplayReviews;
