import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ReviewDetailPage.css";

const ReviewDetailPage = () => {
  const { id } = useParams(); 
  const [review, setReview] = useState(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/review/${id}`);
        setReview(response.data);
      } catch (error) {
        console.error("Error fetching review details:", error);
      }
    };
    fetchReview();
  }, [id]);

  if (!review) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="review-detail-container">
      <h1>{review.name}</h1>
      <img src={review.image.url} alt="pgpic" className="review-detail-img" />
      <p><strong>Location:</strong> {review.location}</p>
      <p><strong>Review:</strong> {review.reviewText}</p>
      <p><strong>Rating:</strong> ⭐ {review.rating}/5</p>
      <p><strong>Price Range:</strong> {review.priceRange}</p>
      <p><strong>Room Type:</strong> {review.roomType}</p>

      
      <div className="facilities-section">
        <h3>Facilities:</h3>
        <ul>
          {review.facilities.map((facility, index) => (
            <li key={index}>{facility}</li>
          ))}
        </ul>
      </div>

  
      <div className="facilities-rating">
        <h3>Facilities Ratings:</h3>
        <ul>
          {Object.entries(review.facilitiesRating).map(([key, value], index) => (
            <li key={index}><strong>{key}:</strong> {value}/5</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReviewDetailPage;
