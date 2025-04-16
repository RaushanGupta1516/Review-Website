import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./Reviewcard.css";

const Reviewcard = ({
  id,
  placeName,
  reviewerName,
  reviewerId,
  location,
  reviewText,
  rating,
  images = [],
  facilities = [],
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
        setLiked(likes.includes(decoded.id));
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
          setLikeCount((prevCount) => (prevLiked ? prevCount - 1 : prevCount + 1));
          return !prevLiked;
        });
      } else {
        toast.error(data.message || "Unable to like the review.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLiking(false);
    }
  };

  // Use image URL if available, otherwise fallback
  const firstImageUrl =
    images?.length > 0 && images[0]?.url
      ? images[0].url
      : "/images/default-pg.jpg";

  return (
    <div className="reviewcard">
      <Link to={`/review/${id}`} className="reviewcard-link">
        <div>
          <img src={firstImageUrl} alt="pg pic" className="hostel-img" />
        </div>
      </Link>

      <div className="reviewcontent">
        <div className="nameadd">
          <h2>{placeName}</h2>
          <p className="location">{location}</p>
        </div>

        <p className="review-text clamped">{reviewText}</p>

        {reviewText.length > 100 && (
          <Link to={`/review/${id}`} className="read-more">
            Read more
          </Link>
        )}

        <div className="reviewlike">
          <p className="rating">⭐ Rating: {rating}/5</p>

          <div className="review-actions">
            <button
              className={`like-btn ${liked ? "liked" : ""}`}
              onClick={handleLikeClick}
              disabled={isLiking}
              aria-label={liked ? "Unlike this review" : "Like this review"}
            >
              👍 {likeCount}
            </button>
          </div>
        </div>

        <p className="author-name">
          Reviewed by: <strong>{reviewerName || "Anonymous"}</strong>
          {userId === reviewerId && <span> (you)</span>}
        </p>

        <div className="tags">
          {facilities.length > 0 ? (
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
