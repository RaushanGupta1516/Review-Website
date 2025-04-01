import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../StoreContext";
import { useContext } from "react";
import { toast } from "react-toastify";
const Nav = ({ setshowLogin }) => {
  const { token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    toast.success("Logged out successfully");
  };
  return (
    <div className="navbox">
      <div className="logobox">
        <img src="logo.avif" alt="logo" height="50px" />
        <h2>StayStory</h2>
      </div>
      <div className="centernav">
        <Link to="/">
          <button>Home</button>
        </Link>
        <button>Contact</button>
        <input type="text" id="search" placeholder="Search Hostel/PG" />
      </div>

      <div className="reviewloginbox">
         <Link to="/post-review">
          <button>Post Your Review</button>
        </Link>
        
        {!token ? (
          <button
            onClick={() => setshowLogin(true)}
          >
            Signup
          </button>
        ) : (
          <button onClick={logOut}>Logout</button>
        )}
      </div>
    </div>
  );
}
export default Nav;
