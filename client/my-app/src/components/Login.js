import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { StoreContext } from "../StoreContext";

import './Login.css';

const Login = ({ setshowLogin }) => {
	const apiUrl = "http://localhost:2000";
	const { setToken, getUserData } = useContext(StoreContext); 
	const [page, setPage] = useState("Sign up");
	const [data, setdata] = useState({
		name: "",
		email: "",
		password: "",
	});

	const handleOnchange = (e) => {
		const { name, value } = e.target;
		setdata((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let endpoint = page === "Login" ? "/user/login" : "/user/signup";

		try {
			const res = await axios.post(apiUrl + endpoint, data);
			if (res.data.success) {
				const token = res.data.token;

				setToken(token);
				localStorage.setItem("token", token);

				await getUserData(token);

				setshowLogin(false);
				toast.success("Logged in successfully");
			} else {
				toast.error("Login failed");
			}
		} catch (error) {
			toast.error(error.response?.data?.message || "An error occurred");
		}
	};

	return (
		<div className="login-overlay">
			<div className="login-container">
				<button onClick={() => setshowLogin(false)} className="close-btn">⨯</button>

				<h2 className="login-title">{page}</h2>
				<form onSubmit={handleSubmit} className="login-form">
					{page === "Sign up" && (
						<input
							onChange={handleOnchange}
							type="text"
							name="name"
							value={data.name}
							placeholder="Username"
							required
							className="input-field"
						/>
					)}
					<input
						onChange={handleOnchange}
						type="email"
						name="email"
						value={data.email}
						placeholder="Email address"
						required
						className="input-field"
					/>
					<input
						onChange={handleOnchange}
						type="password"
						name="password"
						value={data.password}
						placeholder="Password"
						required
						className="input-field"
					/>
					<button type="submit" className="login-btn">
						{page === "Sign up" ? "Create Account" : "Login now"}
					</button>
					<div className="terms-container">
						<input type="checkbox" required className="checkbox" />
						<p>Agree to the terms of use & privacy policy.</p>
					</div>
					<p className="toggle-text">
						{page === "Sign up" ? (
							<>
								Already have an account?{" "}
								<span className="toggle-link" onClick={() => setPage("Login")}>
									Login here
								</span>
							</>
						) : (
							<>
								Create an Account?{" "}
								<span className="toggle-link" onClick={() => setPage("Sign up")}>
									Click here
								</span>
							</>
						)}
					</p>
				</form>
			</div>
		</div>
	);
};

export default Login;
