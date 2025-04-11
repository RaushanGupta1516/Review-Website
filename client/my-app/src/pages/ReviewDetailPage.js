import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../StoreContext";
import "./ReviewDetailPage.css";

const ReviewDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const { user, token } = useContext(StoreContext);

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

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:2000/review/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setReview(null);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to delete review.");
    }
  };

  if (!review) {
    return <h2>Loading...</h2>;
  }

  const isAuthor = user && review.user === user.id;

  return (
    <div className="review-detail-container">
      <div className="review-content">
        <div className="review-left">
          <h1 className="review-title">{review.name}</h1>
          <img src={review.image.url} alt="pgpic" className="review-detail-img" />
        </div>

        <div className="review-info">
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

          {isAuthor && (
            <div className="review-buttons">
              <button className="edit-btn" onClick={() => navigate(`/edit-review/${id}`)}>Edit</button>
              <button className="delete-btn" onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewDetailPage;
